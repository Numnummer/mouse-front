class ExerciseQueries {
  static const String getAllExercises = r'''
    query GetAllExercises($jwtToken: String!) {
          GetAllExercises(
            jwtToken: $jwtToken,
          ) {
              id
              name
              description              
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