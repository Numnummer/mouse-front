import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:provider/provider.dart';
import './screen/auth_screen.dart';
import './screen/main_screen.dart';
import './provider/auth_provider.dart';

void main() {
  final HttpLink httpLink = HttpLink('http://10.0.2.2:5014/api/graphql');

  final GraphQLClient client = GraphQLClient(
    cache: GraphQLCache(store: InMemoryStore()),
    link: httpLink,
  );

  runApp(
    ChangeNotifierProvider(
      create: (context) => AuthProvider(client),
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