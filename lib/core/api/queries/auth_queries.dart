class AuthQueries{
  static const String register=r'''
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(
          username: $username,
          email: $email,
          password: $password
        ) {          
          token
          message
          success
        }
      }
  ''';

  static const String login=r'''
    query Login($email: String!, $password: String!) {
        Login(
          email: $email,
          password: $password
        ) {
          token
          message
          success
        }
      }
  ''';
}