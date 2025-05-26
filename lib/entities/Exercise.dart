import 'package:flutter/cupertino.dart';

class Exercise {
  final String id;
  final String name;
  final IconData? icon;
  final String? description;

  Exercise({required this.id, required this.name, this.description, this.icon});

  factory Exercise.fromJson(Map<String, dynamic> json) {
    return Exercise(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
    };
  }
}