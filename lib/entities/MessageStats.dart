class MessageStats {
  final String userId;
  final int totalCount;
  final DateTime lastMessageDate;
  final DateTime updatedAt;

  MessageStats({
    required this.userId,
    required this.totalCount,
    required this.lastMessageDate,
    required this.updatedAt,
  });

  factory MessageStats.fromJson(Map<String, dynamic> json) {
    return MessageStats(
      userId: _parseString(json['userId']),
      totalCount: _parseInt(json['totalCount']),
      lastMessageDate: _parseDateTime(json['lastMessageDate']),
      updatedAt: _parseDateTime(json['updatedAt'] ?? DateTime.now().toString()),
    );
  }

  static String _parseString(dynamic value) => value?.toString() ?? '';
  static int _parseInt(dynamic value) => (value is num) ? value.toInt() : 0;
  static DateTime _parseDateTime(dynamic value) {
    if (value == null) return DateTime.now();
    if (value is DateTime) return value;
    try {
      return DateTime.parse(value.toString());
    } catch (_) {
      return DateTime.now();
    }
  }
}