import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

import '../../../entities/UserInfo.dart';

class UserApi {
  final storage = FlutterSecureStorage();

  Future<UserInfo> getCurrentUserInfo() async {
    final token = await storage.read(key: 'jwt_token');
    final response = await http.get(
      Uri.parse('http://10.0.2.2:5049/api/User/currentUserInfo'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return UserInfo.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load user info');
    }
  }
}