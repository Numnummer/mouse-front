import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../core/api/rest/UserApi.dart';
import '../entities/MessageStats.dart';
import '../entities/UserInfo.dart';
import '../provider/rabbit_provider.dart';

class StatsScreen extends StatefulWidget {
  final UserApi apiService = new UserApi();

  StatsScreen({Key? key}) : super(key: key);

  @override
  _StatsScreenState createState() => _StatsScreenState();
}

class _StatsScreenState extends State<StatsScreen> {
  late RabbitMqProvider? _rabbitMq;
  MessageStats? _lastStats;
  UserInfo? _userInfo;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadUserAndConnect();
  }

  Future<void> _loadUserAndConnect() async {
    try {
      // 1. Загружаем информацию о пользователе
      final userInfo = await widget.apiService.getCurrentUserInfo();

      // 2. Подключаемся к RabbitMQ
      _rabbitMq = RabbitMqProvider(userInfo.userId);
      await _rabbitMq!.connect(_handleMessage);

      setState(() {
        _userInfo = userInfo;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  void _handleMessage(MessageStats stats) {
    if (!mounted) return;
    setState(() {
      _lastStats = stats;
    });
  }

  @override
  void dispose() {
    _rabbitMq?.disconnect();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Message Statistics'),
        actions: [
          if (_userInfo != null)
            IconButton(
              icon: const Icon(Icons.person),
              onPressed: () => _showUserInfoDialog(),
            ),
        ],
      ),
      body: _buildContent(),
    );
  }

  Widget _buildContent() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_error != null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Error: $_error'),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _loadUserAndConnect,
              child: const Text('Retry'),
            ),
          ],
        ),
      );
    }

    return Column(
      children: [
        // Информация о пользователе
        if (_userInfo != null) ...[
          ListTile(
            leading: const Icon(Icons.person),
            title: Text('${_userInfo!.firstName} ${_userInfo!.lastName}'),
            subtitle: Text(_userInfo!.email ?? 'No email'),
          ),
          const Divider(),
        ],

        // Статистика сообщений
        Expanded(
          child: Center(
            child: _lastStats == null
                ? const Text('Waiting for messages...')
                : Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Total Messages: ${_lastStats!.totalCount}',
                    style: const TextStyle(fontSize: 24)),
                const SizedBox(height: 20),
                Text('Last update: ${DateFormat('dd.MM.yyyy HH:mm').format(_lastStats!.updatedAt.add(const Duration(hours: 3)))}'),
              ],
            ),
          ),
        ),
      ],
    );
  }

  void _showUserInfoDialog() {
    if (_userInfo == null) return;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('User Profile'),
        content: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('Name: ${_userInfo!.firstName} ${_userInfo!.lastName}'),
              if (_userInfo!.email != null) Text('Email: ${_userInfo!.email}'),
              if (_userInfo!.phoneNumber != null)
                Text('Phone: ${_userInfo!.phoneNumber}'),
              if (_userInfo!.gender != null)
                Text('Gender: ${_userInfo!.gender}'),
              if (_userInfo!.dateOfBirth != null)
                Text('Birth Date: ${_userInfo!.dateOfBirth!.toLocal()}'),
              if (_userInfo!.height != null)
                Text('Height: ${_userInfo!.height} cm'),
              if (_userInfo!.weight != null)
                Text('Weight: ${_userInfo!.weight} kg'),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }
}