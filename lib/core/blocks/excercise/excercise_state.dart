import 'package:collection/collection.dart';

import '../../../entities/Exercise.dart';

abstract class ExerciseState {
  const ExerciseState();
}

class ExerciseInitial extends ExerciseState {
  const ExerciseInitial();
}

class ExerciseLoading extends ExerciseState {
  const ExerciseLoading();
}

class ExerciseLoaded extends ExerciseState {
  final List<Exercise> exercises;

  const ExerciseLoaded(this.exercises);

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
          other is ExerciseLoaded &&
              runtimeType == other.runtimeType &&
              const ListEquality().equals(exercises, other.exercises);

  @override
  int get hashCode => const ListEquality().hash(exercises);
}

class ExerciseError extends ExerciseState {
  final String message;

  const ExerciseError(this.message);

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
          other is ExerciseError &&
              runtimeType == other.runtimeType &&
              message == other.message;

  @override
  int get hashCode => message.hashCode;
}