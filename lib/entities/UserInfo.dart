class UserInfo {
  final String userId;
  final String? userProfileId;
  final String? email;
  final String firstName;
  final String lastName;
  final String? gender;
  final DateTime? dateOfBirth;
  final String? phoneNumber;
  final int? height;
  final int? weight;

  UserInfo({
    required this.userId,
    this.userProfileId,
    this.email,
    required this.firstName,
    required this.lastName,
    this.gender,
    this.dateOfBirth,
    this.phoneNumber,
    this.height,
    this.weight,
  });

  factory UserInfo.fromJson(Map<String, dynamic> json) {
    return UserInfo(
      userId: json['userId'],
      userProfileId: json['userProfileId'],
      email: json['email'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      gender: json['gender'],
      dateOfBirth: json['dateOfBirth'] != null
          ? DateTime.parse(json['dateOfBirth'])
          : null,
      phoneNumber: json['phoneNumber'],
      height: json['height'],
      weight: json['weight'],
    );
  }
}