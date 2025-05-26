import 'package:bloc/bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../../../entities/Exercise.dart';
import '../../api/grapgql_client.dart';
import '../../api/queries/excercise_queries.dart';
import 'excercise_event.dart';
import 'excercise_state.dart';

class ExerciseBloc extends Bloc<ExerciseEvent, ExerciseState> {
  final GraphQLClient _client;

  ExerciseBloc(this._client) : super(ExerciseInitial()) {
    on<LoadExercises>(_onLoadExercises);
    on<AddExercise>(_onAddExercise);
    on<DeleteExercise>(_onDeleteExercise);
  }

  final storage = FlutterSecureStorage();

  Future<void> _onLoadExercises(
      LoadExercises event,
      Emitter<ExerciseState> emit,
      ) async {
    emit(ExerciseLoading());
    try {
      final result = await _client.query(
        QueryOptions(
          document: gql(ExerciseQueries.getAllExercises),
          fetchPolicy: FetchPolicy.networkOnly,
          variables: {
            "jwtToken": await storage.read(key: 'jwt_token'),
          },
        ),
      );
      if (result.hasException) throw result.exception!;

      final exercisesData = result.data?['GetAllExercises'];

      // Proper null and type checking
      if (exercisesData == null || exercisesData.isEmpty) {
        emit(ExerciseLoaded([]));
        return;
      }

      final List<Exercise> exercises = [];

      for (var data in exercisesData) {
        exercises.add(
          Exercise(
            id: data['id'] as String,
            name: data['name'] as String,
            description: data['description'] as String?, // если может быть null
            icon: null, // задайте вашу иконку, если нужно
          ),
        );
      }

      emit(ExerciseLoaded(exercises));
    } catch (e) {
      emit(ExerciseError(e.toString()));
    }
  }

  Future<void> _onAddExercise(
      AddExercise event,
      Emitter<ExerciseState> emit,
      ) async {
    try {
      final result = await _client.mutate(
        MutationOptions(document: gql(ExerciseQueries.addExercise),
            variables: {
              'jwtToken': await storage.read(key: 'jwt_token'),
              'name': event.name,
              'description': event.description,
            })
      );

      if (result.hasException) throw result.exception!;
      add(LoadExercises());
    } catch (e) {
      emit(ExerciseError(e.toString()));
    }
  }

  Future<void> _onDeleteExercise(DeleteExercise event, Emitter<ExerciseState> emit) async {
     if(state is ExerciseLoaded){
       final currentState = state as ExerciseLoaded;
       final updated = List<Exercise>.from(currentState.exercises);
       updated.removeAt(event.index);
       emit(ExerciseLoaded(updated));
     }
  }
}