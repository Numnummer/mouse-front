import 'package:graphql_flutter/graphql_flutter.dart';

class GraphQLClientService {
  final Link _link;
  late final GraphQLClient _client;

  GraphQLClientService(String endpoint)
      : _link = HttpLink(endpoint) {
    _client = GraphQLClient(
      cache: GraphQLCache(),
      link: _link,
    );
  }

  Future<QueryResult> query(String query, {Map<String, dynamic>? variables}) async {
    return await _client.query(
      QueryOptions(
        document: gql(query),
        variables: variables ?? {},
      ),
    );
  }

  Future<QueryResult> mutate(String mutation, {Map<String, dynamic>? variables}) async {
    return await _client.mutate(
      MutationOptions(
        document: gql(mutation),
        variables: variables ?? {},
      ),
    );
  }
}