import 'package:flutter/material.dart';
import 'package:uuid/v4.dart';

import '../entities/Exercise.dart';
import 'package:uuid/uuid.dart';

class ExercisesScreen extends StatefulWidget {
  const ExercisesScreen({super.key});

  @override
  _ExercisesScreenState createState() => _ExercisesScreenState();
}

class _ExercisesScreenState extends State<ExercisesScreen> {
  UuidV4 uuid = UuidV4();
  late List<Exercise> _exercises;

  @override
  void initState() {
    super.initState();
    _exercises=_initExcercises();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _buildExercisesList(),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddExerciseDialog,
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildExercisesList() {
    return ListView.builder(
      itemCount: _exercises.length,
      itemBuilder: (context, index) {
        final exercise = _exercises[index];
        return Card(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: ListTile(
            leading: Icon(exercise.icon, color: Colors.blue),
            title: Text(exercise.name),
            trailing: IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              onPressed: () => _deleteExercise(index),
            ),
            onTap: () {
              // Действие при тапе на упражнение
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Выбрано: ${exercise.name}')),
              );
            },
          ),
        );
      },
    );
  }

  void _showAddExerciseDialog() {
    final textController = TextEditingController();
    IconData selectedIcon = Icons.fitness_center;

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              title: const Text('Добавить упражнение'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextField(
                    controller: textController,
                    decoration: const InputDecoration(
                      labelText: 'Название упражнения',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text('Выберите иконку:'),
                  Wrap(
                    spacing: 8,
                    children: [
                      _buildIconButton(Icons.fitness_center, selectedIcon, setState),
                      _buildIconButton(Icons.directions_run, selectedIcon, setState),
                      _buildIconButton(Icons.accessibility, selectedIcon, setState),
                      _buildIconButton(Icons.timer, selectedIcon, setState),
                      _buildIconButton(Icons.directions_bike, selectedIcon, setState),
                      _buildIconButton(Icons.pool, selectedIcon, setState),
                    ],
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Отмена'),
                ),
                ElevatedButton(
                  onPressed: () {
                    if (textController.text.isNotEmpty) {
                      setState(() {
                        _exercises.add(
                          Exercise(id:uuid.generate(), name: textController.text, icon: selectedIcon),
                        );
                      });
                      Navigator.pop(context);
                    }
                  },
                  child: const Text('Добавить'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  Widget _buildIconButton(IconData icon, IconData selectedIcon, Function setState) {
    return IconButton(
      icon: Icon(icon),
      color: icon == selectedIcon ? Colors.blue : Colors.grey,
      onPressed: () {
        setState(() {
          selectedIcon = icon;
        });
      },
    );
  }

  void _deleteExercise(int index) {
    setState(() {
      _exercises.removeAt(index);
    });
  }

  List<Exercise> _initExcercises(){
    return [
      Exercise(id:uuid.generate(), name: 'Приседания', icon: Icons.fitness_center),
      Exercise(id:uuid.generate(), name: 'Отжимания', icon: Icons.directions_run),
      Exercise(id:uuid.generate(), name: 'Подтягивания', icon: Icons.accessibility),
      Exercise(id:uuid.generate(), name: 'Планка', icon: Icons.timer),
      Exercise(id:uuid.generate(), name: 'Бег', icon: Icons.directions_run),
      Exercise(id:uuid.generate(), name: 'Велосипед', icon: Icons.directions_bike),
    ];
  }
}

