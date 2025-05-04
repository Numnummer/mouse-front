import 'package:flutter/material.dart';

class AuthProvider with ChangeNotifier {
  bool _isAuthenticated = true;

  bool get isAuthenticated => _isAuthenticated;

  void login(String email, String password) {
    // Здесь должна быть логика входа
    _isAuthenticated = true;
    notifyListeners();
  }

  void register(String email, String password, String username) {
    // Здесь должна быть логика регистрации
    _isAuthenticated = true;
    notifyListeners();
  }

  void logout() {
    _isAuthenticated = false;
    notifyListeners();
  }
}