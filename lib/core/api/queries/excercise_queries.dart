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

  static const String addExercise = r'''
    mutation AddExercise($jwtToken: String!, $name: String!, $description: String) {
      AddExercise(jwtToken: $jwtToken, name: $name, description: $description) 
    }
  ''';

  static const String deleteExercise = r'''
    mutation DeleteExercise($jwtToken: String!, $id: String!) {
      DeleteExercise(jwtToken: $jwtToken, id: $id) 
    }
  ''';
}