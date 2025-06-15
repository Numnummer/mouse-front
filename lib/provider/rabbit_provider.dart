import 'dart:convert';

import 'package:dart_amqp/dart_amqp.dart';

import '../entities/MessageStats.dart';

class RabbitMqProvider {
  late Client _client;
  late Channel _channel;
  String? _queueName;
  final String _userId;

  RabbitMqProvider(this._userId);

  Future<void> connect(Function(MessageStats) onMessage) async {
    _client = Client(
        settings: ConnectionSettings(
          host: '10.0.2.2',
          port: 5672,
          authProvider: AmqPlainAuthenticator('big', 'P@ssw0rd'),
          virtualHost: '/', // Явно указываем виртуальный хост
        ),);

        _channel = await _client.channel();
    final queue = await _channel.queue('user-$_userId-stats', durable: true);
    final exchange = await _channel.exchange('message-stats', ExchangeType.DIRECT, durable: true);
    await queue.bind(exchange, _userId);

    final consumer = await queue.consume();
    consumer.listen((message) {
      try {
        // 1. Проверка payload
        if (message.payload == null) {
          throw Exception('Received null message payload');
        }

        // 2. Декодирование сообщения
        final messageText = utf8.decode(message.payload!);
        final jsonData = jsonDecode(messageText) as Map<String, dynamic>?;

        if (jsonData == null) {
          throw Exception('Failed to decode JSON message');
        }

        // 3. Извлечение данных stats
        final statsData = jsonData['message'];
        if (statsData == null) {
          throw Exception('"message" field is missing in payload');
        }

        // 4. Преобразование в объект
        final stats = MessageStats.fromJson(
            statsData is Map<String, dynamic>
                ? statsData
                : {'userId': '', 'totalCount': 0}
        );

        // 5. Обработка сообщения
        onMessage(stats);
      } catch (e, stackTrace) {
        print('Error processing message: $e');
        print('Stack trace: $stackTrace');
        message.reject(false);
      }
      message.ack();
    });
  }

  Future<void> disconnect() async {
    await _channel.close();
    await _client.close();
  }
}