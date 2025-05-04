import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'Exercise.dart';

class Workout {
  final String name;
  final String description;
  final List<Exercise> exercises;
  final IconData icon;

  Workout({
    required this.name,
    required this.description,
    required this.exercises,
    this.icon = Icons.fitness_center,
  });
}