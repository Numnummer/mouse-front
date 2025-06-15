import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:dart_amqp/dart_amqp.dart' as amqp;
import 'package:grpc/grpc.dart';
import 'package:mime/mime.dart';
import 'package:mobile_front/generated/messagingService.pbgrpc.dart';
import 'package:uuid/uuid.dart';

import '../core/api/rest/UserApi.dart';

class ChatScreen extends StatefulWidget {
  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatScreen> {
  final List<String> topics = ['coach-user', 'admin-user', 'coach-admin'];
  String selectedTopic = 'coach-user';
  final TextEditingController _messageController = TextEditingController();
  final List<ChatMessage> _messages = [];
  late amqp.Client _amqpClient;
  late MessagingClient _grpcClient;
  String? _clientId;
  String _userRole = 'user';
  late StreamSubscription<amqp.AmqpMessage> _subscription;
  late amqp.Channel _amqpChannel;
  final UserApi apiService = new UserApi();

  @override
  void initState() {
    super.initState();
    _initGrpc();
    _initRabbitMQ();
    _loadUser();
  }

  Future<void> _loadUser() async {
    try {
      final userInfo = await apiService.getCurrentUserInfo();
      _clientId = userInfo.userId;
    }
    catch(e){
      print(e);
    }
  }

  void _initGrpc() {
    final channel = ClientChannel(
      '10.0.2.2',
      port: 5102,
      options: ChannelOptions(
        credentials: ChannelCredentials.insecure(),
        idleTimeout: Duration(minutes: 1),
      ),
    );
    _grpcClient = MessagingClient(channel);
  }

  Future<void> _initRabbitMQ() async {
    try {
      _amqpClient = amqp.Client(
        settings: amqp.ConnectionSettings(
          host: '10.0.2.2',
          port: 5672,
          authProvider: amqp.AmqPlainAuthenticator('big', 'P@ssw0rd'),
          virtualHost: '/', // Явно указываем виртуальный хост
        ),
      );

      _amqpChannel = await _amqpClient.channel();
      await _subscribeToTopic(selectedTopic);
    } catch (e) {
      print('RabbitMQ connection error: $e');
      _reconnectRabbitMQ();
    }
  }

  Future<void> _reconnectRabbitMQ() async {
    await Future.delayed(Duration(seconds: 5));
    if (!mounted) return;
    _initRabbitMQ();
  }

  Future<void> _subscribeToTopic(String topic) async {
    try {
      // Отписываемся от предыдущей подписки, если есть
      await _subscription.cancel();
    } catch (e) {
      print('Error canceling previous subscription: $e');
    }

    try {
      final queue = await _amqpChannel.queue(
        'flutter_chat_$topic',
        durable: true,
        autoDelete: false
      );
      final exchange = await _amqpChannel.exchange('messaging_exchange', amqp.ExchangeType.DIRECT, durable: true);
      await queue.bind(exchange, topic);

      final consumer = await queue.consume(noAck: false); // Получаем Consumer
      print(consumer.queue.name);

      _subscription = consumer.listen((amqp.AmqpMessage message) {
        final messageText = utf8.decode(message.payload!);
        final jsonData = jsonDecode(messageText);
        _addMessageToChat(
          text: jsonData["message"]["messageText"],
          topic: topic,
          sender: 'System',
          isMyMessage: false,
        );

        // Подтверждаем получение сообщения
        message.ack();
      }, onError: (error) {
        print('RabbitMQ consumption error: $error');
        _reconnectRabbitMQ();
      });
    } catch (e) {
      print('RabbitMQ subscribe error: $e');
      _reconnectRabbitMQ();
    }
  }

  void _addMessageToChat({
    required String text,
    required String topic,
    required String sender,
    required bool isMyMessage,
    List<String>? files,
  }) {
    if (!mounted) return;

    setState(() {
      _messages.add(ChatMessage()
        ..text = text
        ..topic = topic
        ..sender = sender
        ..isMyMessage = isMyMessage
        ..files.addAll(files ?? []));
    });
  }

  Future<void> _sendMessage() async {
    if (_messageController.text.isEmpty) return;

    final messageText = _messageController.text;
    _messageController.clear();
    if(_clientId==null){
      await _loadUser();
    }

    // Сначала добавляем сообщение локально для быстрого отображения
    _addMessageToChat(
      text: messageText,
      topic: selectedTopic,
      sender: _clientId ?? '',
      isMyMessage: true,
    );

    try {
      final request = MulticastMessageRequest()
        ..author = _clientId ?? ''
        ..messageText = messageText
        ..destination = selectedTopic
        ..role = _userRole;

      await _grpcClient.sendMulticastMessage(request);
    } catch (e) {
      print('gRPC error details: $e');
      if (e is GrpcError) {
        print('gRPC specific error: code ${e.codeName}, message: ${e.message}');
      }
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to send message')),
        );
      }
      rethrow;
    }
  }

  Future<void> _sendFiles() async {
    try {
      final result = await FilePicker.platform.pickFiles(
        allowMultiple: true,
        type: FileType.any,
      );

      if (result == null || result.files.isEmpty) return;
      if(_clientId==null){
        await _loadUser();
      }

      final request = MulticastMessageRequest()
        ..author = _clientId ?? ''
        ..destination = selectedTopic
        ..role = _userRole;

      for (final file in result.files) {
        final bytes = File(file.path!).readAsBytesSync();
        request.fileNames.add(file.name);
        request.filesContentBase64.add(base64Encode(bytes) as List<int>);
        request.filesMetadata.add(
          'type:${lookupMimeType(file.path!)},size:${file.size}',
        );
      }

      final response = await _grpcClient.sendMulticastMessage(request);
      if (response.success) {
        _addMessageToChat(
          text: 'Sent ${result.files.length} file(s)',
          topic: selectedTopic,
          sender: _clientId ?? '',
          isMyMessage: true,
          files: result.files.map((f) => f.name).toList(),
        );
      }
    } catch (e) {
      print('File send error: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to send files')),
        );
      }
    }
  }

  Widget _buildMessageBubble(ChatMessage message) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 4, horizontal: 8),
      alignment: message.isMyMessage
          ? Alignment.centerRight
          : Alignment.centerLeft,
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
        child: Card(
          color: message.isMyMessage
              ? Colors.blue[50]
              : Colors.grey[200],
          child: Padding(
            padding: EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (!message.isMyMessage)
                  Text(
                    '${message.sender} in ${message.topic}',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                SizedBox(height: 4),
                Text(message.text),
                if (message.files.isNotEmpty) ...[
                  SizedBox(height: 8),
                  Text(
                    'Files: ${message.files.join(', ')}',
                    style: TextStyle(fontSize: 12, color: Colors.blue),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Group Chat'),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: () => _subscribeToTopic(selectedTopic),
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(8),
            child: DropdownButtonFormField<String>(
              value: selectedTopic,
              decoration: InputDecoration(
                labelText: 'Select Group',
                border: OutlineInputBorder(),
                filled: true,
                fillColor: Colors.grey[100],
              ),
              items: topics.map((topic) {
                return DropdownMenuItem(
                  value: topic,
                  child: Text(topic),
                );
              }).toList(),
              onChanged: (newTopic) {
                if (newTopic != null && newTopic != selectedTopic) {
                  setState(() => selectedTopic = newTopic);
                  _subscribeToTopic(newTopic);
                }
              },
            ),
          ),
          Expanded(
            child: ListView.builder(
              reverse: true,
              itemCount: _messages.length,
              itemBuilder: (ctx, index) {
                final message = _messages[_messages.length - 1 - index];
                return _buildMessageBubble(message);
              },
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8),
            child: Row(
              children: [
                IconButton(
                  icon: Icon(Icons.attach_file),
                  onPressed: _sendFiles,
                ),
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    decoration: InputDecoration(
                      hintText: 'Type a message...',
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(horizontal: 12),
                    ),
                    maxLines: 3,
                    minLines: 1,
                    onSubmitted: (_) => _sendMessage(),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.send, color: Colors.blue),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _subscription.cancel();
    _amqpClient.close();
    _messageController.dispose();
    super.dispose();
  }
}

class ChatMessage {
  String text = '';
  String topic = '';
  String sender = '';
  bool isMyMessage = false;
  List<String> files = [];
}