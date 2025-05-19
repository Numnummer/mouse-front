class ExerciseQueries {
  static const String getAllExercises = '''
    query {
      exercises {
        id
        name
        description
        icon
        category
      }
    }
  ''';

  static const String addExercise = '''
    mutation AddExercise(\$name: String!, \$description: String, \$icon: String!, \$category: String!) {
      addExercise(name: \$name, description: \$description, icon: \$icon, category: \$category) {
        id
        name
      }
    }
  ''';
}