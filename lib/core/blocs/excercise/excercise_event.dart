abstract class ExerciseEvent {
  const ExerciseEvent();
}

class LoadExercises extends ExerciseEvent {
  const LoadExercises();
}

class AddExercise extends ExerciseEvent {
  final String name;
  final String? description;
  final String? icon;
  final String? category;

  const AddExercise({
    required this.name,
    this.description,
    this.icon,
    this.category,
  });

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
          other is AddExercise &&
              runtimeType == other.runtimeType &&
              name == other.name &&
              description == other.description &&
              icon == other.icon &&
              category == other.category;

  @override
  int get hashCode =>
      name.hashCode ^
      description.hashCode ^
      icon.hashCode ^
      category.hashCode;
}

class DeleteExercise extends ExerciseEvent{
  final String id;

  DeleteExercise(this.id);

}