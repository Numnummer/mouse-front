import 'package:bloc/bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../../../entities/Exercise.dart';
import '../../api/grapgql_client.dart';
import '../../api/queries/excercise_queries.dart';
import 'excercise_event.dart';
import 'excercise_state.dart';

class ExerciseBloc extends Bloc<ExerciseEvent, ExerciseState> {
  final GraphQLClientService _client;

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
      final result = await _client.query(ExerciseQueries.getAllExercises,
      variables: {
        "jwtToken": await storage.read(key: 'jwt_token')
      });
      if (result.hasException) throw result.exception!;

      final exercisesData = result.data?['GetAllExercises'];

      // Proper null and type checking
      if (exercisesData == null || exercisesData.isEmpty) {
        emit(ExerciseLoaded([]));
        return;
      }

      final exercises = exercisesData
          .map((e) => Exercise.fromJson(e))
          .toList();
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
        ExerciseQueries.addExercise,
        variables: {
          'name': event.name,
          'description': event.description,
          'icon': event.icon,
          'category': event.category,
        },
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