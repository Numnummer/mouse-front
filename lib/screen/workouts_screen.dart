import 'package:flutter/material.dart';

import '../entities/Exercise.dart';
import '../entities/Workout.dart';



class WorkoutsScreen extends StatefulWidget {
  const WorkoutsScreen({super.key});

  @override
  _WorkoutsScreenState createState() => _WorkoutsScreenState();
}

class _WorkoutsScreenState extends State<WorkoutsScreen> {
  final List<Workout> _workouts = [
    Workout(
      name: 'Силовая тренировка',
      description: 'Базовая тренировка на все группы мышц',
      exercises: [
        Exercise(name: 'Приседания', icon: Icons.fitness_center),
        Exercise(name: 'Жим лежа', icon: Icons.fitness_center),
        Exercise(name: 'Тяга штанги', icon: Icons.fitness_center),
      ],
      icon: Icons.fitness_center,
    ),
    Workout(
      name: 'Кардио',
      description: 'Интервальная тренировка',
      exercises: [
        Exercise(name: 'Бег', icon: Icons.directions_run),
        Exercise(name: 'Велосипед', icon: Icons.directions_bike),
      ],
      icon: Icons.directions_run,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _buildWorkoutsList(),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddWorkoutDialog,
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildWorkoutsList() {
    return ListView.builder(
      itemCount: _workouts.length,
      itemBuilder: (context, index) {
        final workout = _workouts[index];
        return Card(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: ListTile(
            leading: Icon(workout.icon, color: Colors.blue),
            title: Text(workout.name),
            subtitle: Text(workout.description),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: const Icon(Icons.edit, color: Colors.grey),
                  onPressed: () => _editWorkout(index),
                ),
                IconButton(
                  icon: const Icon(Icons.delete, color: Colors.red),
                  onPressed: () => _deleteWorkout(index),
                ),
              ],
            ),
            onTap: () => _showWorkoutDetails(workout),
          ),
        );
      },
    );
  }

  void _showAddWorkoutDialog() {
    final nameController = TextEditingController();
    final descController = TextEditingController();
    IconData selectedIcon = Icons.fitness_center;
    List<Exercise> selectedExercises = [];

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              title: const Text('Создать тренировку'),
              content: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextField(
                      controller: nameController,
                      decoration: const InputDecoration(
                        labelText: 'Название тренировки',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: descController,
                      decoration: const InputDecoration(
                        labelText: 'Описание',
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
                        _buildIconButton(Icons.pool, selectedIcon, setState),
                        _buildIconButton(Icons.self_improvement, selectedIcon, setState),
                      ],
                    ),
                    const SizedBox(height: 16),
                    const Text('Упражнения:'),
                    ...selectedExercises.map((e) => ListTile(
                      leading: Icon(e.icon),
                      title: Text(e.name),
                      trailing: IconButton(
                        icon: const Icon(Icons.remove, color: Colors.red),
                        onPressed: () => setState(() {
                          selectedExercises.remove(e);
                        }),
                      ),
                    )),
                    ElevatedButton(
                      onPressed: () => _selectExercises(setState, selectedExercises),
                      child: const Text('Добавить упражнения'),
                    ),
                  ],
                ),
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Отмена'),
                ),
                ElevatedButton(
                  onPressed: () {
                    if (nameController.text.isNotEmpty) {
                      setState(() {
                        _workouts.add(Workout(
                          name: nameController.text,
                          description: descController.text,
                          exercises: List.from(selectedExercises),
                          icon: selectedIcon,
                        ));
                      });
                      Navigator.pop(context);
                    }
                  },
                  child: const Text('Сохранить'),
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
      onPressed: () => setState(() {
        selectedIcon = icon;
      }),
    );
  }

  void _selectExercises(Function setState, List<Exercise> selectedExercises) async {
    // В реальном приложении здесь нужно получить список упражнений
    // Например, из базы данных или другого экрана
    final availableExercises = [
      Exercise(name: 'Приседания', icon: Icons.fitness_center),
      Exercise(name: 'Отжимания', icon: Icons.directions_run),
      Exercise(name: 'Подтягивания', icon: Icons.accessibility),
      Exercise(name: 'Планка', icon: Icons.timer),
      Exercise(name: 'Бег', icon: Icons.directions_run),
      Exercise(name: 'Велосипед', icon: Icons.directions_bike),
    ];

    final List<Exercise>? result = await showDialog(
      context: context,
      builder: (context) {
        final tempSelected = List<Exercise>.from(selectedExercises);
        return AlertDialog(
          title: const Text('Выберите упражнения'),
          content: SizedBox(
            width: double.maxFinite,
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: availableExercises.length,
              itemBuilder: (context, index) {
                final exercise = availableExercises[index];
                return CheckboxListTile(
                  title: Text(exercise.name),
                  secondary: Icon(exercise.icon),
                  value: tempSelected.contains(exercise),
                  onChanged: (bool? value) {
                    if (value == true) {
                      tempSelected.add(exercise);
                    } else {
                      tempSelected.remove(exercise);
                    }
                  },
                );
              },
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Отмена'),
            ),
            TextButton(
              onPressed: () => Navigator.pop(context, tempSelected),
              child: const Text('Готово'),
            ),
          ],
        );
      },
    );

    if (result != null) {
      setState(() {
        selectedExercises.clear();
        selectedExercises.addAll(result);
      });
    }
  }

  void _deleteWorkout(int index) {
    setState(() {
      _workouts.removeAt(index);
    });
  }

  void _editWorkout(int index) {
    final workout = _workouts[index];
    final nameController = TextEditingController(text: workout.name);
    final descController = TextEditingController(text: workout.description);
    IconData selectedIcon = workout.icon;
    List<Exercise> selectedExercises = List.from(workout.exercises);

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              title: const Text('Редактировать тренировку'),
              content: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextField(
                      controller: nameController,
                      decoration: const InputDecoration(
                        labelText: 'Название тренировки',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: descController,
                      decoration: const InputDecoration(
                        labelText: 'Описание',
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
                        _buildIconButton(Icons.pool, selectedIcon, setState),
                        _buildIconButton(Icons.self_improvement, selectedIcon, setState),
                      ],
                    ),
                    const SizedBox(height: 16),
                    const Text('Упражнения:'),
                    ...selectedExercises.map((e) => ListTile(
                      leading: Icon(e.icon),
                      title: Text(e.name),
                      trailing: IconButton(
                        icon: const Icon(Icons.remove, color: Colors.red),
                        onPressed: () => setState(() {
                          selectedExercises.remove(e);
                        }),
                      ),
                    )),
                    ElevatedButton(
                      onPressed: () => _selectExercises(setState, selectedExercises),
                      child: const Text('Добавить упражнения'),
                    ),
                  ],
                ),
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Отмена'),
                ),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _workouts[index] = Workout(
                        name: nameController.text,
                        description: descController.text,
                        exercises: List.from(selectedExercises),
                        icon: selectedIcon,
                      );
                    });
                    Navigator.pop(context);
                  },
                  child: const Text('Сохранить'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  void _showWorkoutDetails(Workout workout) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(workout.icon, size: 40, color: Colors.blue),
                  const SizedBox(width: 16),
                  Text(
                    workout.name,
                    style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Text(
                workout.description,
                style: const TextStyle(fontSize: 16, color: Colors.grey),
              ),
              const SizedBox(height: 24),
              const Text(
                'Упражнения:',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              ...workout.exercises.map((e) => ListTile(
                leading: Icon(e.icon),
                title: Text(e.name),
              )),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    // Начать тренировку
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Начинаем тренировку: ${workout.name}')),
                    );
                  },
                  child: const Text('Начать тренировку'),
                ),
              ),
              const SizedBox(height: 8),
            ],
          ),
        );
      },
    );
  }
}