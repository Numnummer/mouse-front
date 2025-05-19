import 'package:bloc/bloc.dart';

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
  }

  Future<void> _onLoadExercises(
      LoadExercises event,
      Emitter<ExerciseState> emit,
      ) async {
    emit(ExerciseLoading());
    try {
      final result = await _client.query(ExerciseQueries.getAllExercises);
      if (result.hasException) throw result.exception!;

      final exercises = (result.data?['exercises'] as List)
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
}