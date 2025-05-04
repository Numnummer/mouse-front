import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import './screen/auth_screen.dart';
import './screen/main_screen.dart';
import './provider/auth_provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => AuthProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Фитнес приложение',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Consumer<AuthProvider>(
        builder: (context, auth, child) {
          return auth.isAuthenticated ? const MainScreen() : const AuthScreen();
        },
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}