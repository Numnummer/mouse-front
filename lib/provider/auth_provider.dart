import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../core/api/queries/auth_queries.dart';

class AuthProvider with ChangeNotifier {
  bool _isAuthenticated = false;

  bool get isAuthenticated => _isAuthenticated;

  final GraphQLClient client;
  final storage = FlutterSecureStorage();

  AuthProvider(this.client);

  Future<void> login(String email, String password) async {
    const String loginMutation = AuthQueries.login;

    final result = await client.mutate(MutationOptions(
      document: gql(loginMutation),
      variables: {
        'email': email,
        'password': password,
      },
    ));

    if (result.hasException) {
      // Обработка ошибки
      print('Login failed: ${result.exception}');
      throw Exception('Login failed'); // Можно выбросить более специфичную ошибку
    }

    // Получение токена или другой информации из ответа
    final token = result.data?['Login']['token'];
    if (token != null) {
      _isAuthenticated = true;
      await storage.write(key: 'jwt_token', value: token);
      notifyListeners();
    } else {
      // Обработка случая, когда токен не получен
      throw Exception('Failed to retrieve token');
    }
  }

  Future<void> register(String email, String password, String username) async {
    const String registerMutation = AuthQueries.register;

    final result = await client.mutate(MutationOptions(
      document: gql(registerMutation),
      variables: {
        'username': username,
        'email': email,
        'password': password,
      },
    ));

    if (result.hasException) {
      // Обработка ошибки
      print('Registration failed: ${result.exception}');
      throw Exception('Registration failed'); // Можно выбросить более специфичную ошибку
    }

    // Получение токена или другой информации из ответа
    final token = result.data?['register']['token'];
    if (token != null) {
      _isAuthenticated = true;
      await storage.write(key: 'jwt_token', value: token);
      notifyListeners();
    } else {
      // Обработка случая, когда токен не получен
      throw Exception('Failed to retrieve token');
    }
  }

  void logout() async {
    _isAuthenticated = false;
    await storage.delete(key: 'jwt_token');
    notifyListeners();
  }
}
