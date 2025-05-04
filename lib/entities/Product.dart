import 'package:flutter/cupertino.dart';

class Product {
  final String name;
  final String description;
  final double price;
  final String category;
  final IconData icon;
  bool isInCart;

  Product({
    required this.name,
    required this.description,
    required this.price,
    required this.category,
    required this.icon,
    this.isInCart = false,
  });
}