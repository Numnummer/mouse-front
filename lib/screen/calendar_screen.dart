import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class CalendarScreen extends StatefulWidget {
  const CalendarScreen({super.key});

  @override
  _CalendarScreenState createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  DateTime _currentDate = DateTime.now();
  final Map<DateTime, List<String>> _events = {
    DateTime(DateTime.now().year, DateTime.now().month, 5): ['Тренировка ног', 'Кардио 30 мин'],
    DateTime(DateTime.now().year, DateTime.now().month, 12): ['Силовая тренировка'],
    DateTime(DateTime.now().year, DateTime.now().month + 1, 3): ['Бег 5 км'],
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          DateFormat('MMMM yyyy').format(_currentDate),
          style: const TextStyle(fontSize: 20),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.today),
            onPressed: () {
              setState(() {
                _currentDate = DateTime.now();
              });
            },
          ),
        ],
      ),
      body: Column(
        children: [
          _buildWeekDaysHeader(),
          Expanded(
            child: GridView.builder(
              itemCount: _getDaysInMonth() + _getFirstWeekdayOfMonth(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 7,
              ),
              itemBuilder: (context, index) {
                if (index < _getFirstWeekdayOfMonth()) {
                  return Container(); // Пустые клетки перед первым днем месяца
                }
                final day = index - _getFirstWeekdayOfMonth() + 1;
                final currentDay = DateTime(_currentDate.year, _currentDate.month, day);
                final hasEvents = _events.containsKey(currentDay);

                return GestureDetector(
                  onTap: () => _onDayPressed(currentDay),
                  child: Container(
                    margin: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: hasEvents ? Colors.blue.withOpacity(0.2) : null,
                      border: Border.all(
                        color: _isToday(currentDay) ? Colors.blue : Colors.grey.withOpacity(0.2),
                      ),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Stack(
                      children: [
                        Center(
                          child: Text(
                            day.toString(),
                            style: TextStyle(
                              color: _isToday(currentDay) ? Colors.blue : Colors.black,
                              fontWeight: _isToday(currentDay) ? FontWeight.bold : FontWeight.normal,
                            ),
                          ),
                        ),
                        if (hasEvents)
                          Positioned(
                            bottom: 4,
                            right: 4,
                            child: Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                color: Colors.blue,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 30),
            child: FloatingActionButton(
              mini: true,
              heroTag: 'prev',
              onPressed: _previousMonth,
              child: const Icon(Icons.chevron_left),
            ),
          ),
          FloatingActionButton(
            mini: true,
            heroTag: 'next',
            onPressed: _nextMonth,
            child: const Icon(Icons.chevron_right),
          ),
        ],
      ),
    );
  }

  Widget _buildWeekDaysHeader() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) {
          return Expanded(
            child: Center(
              child: Text(
                day,
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  int _getDaysInMonth() {
    return DateTime(_currentDate.year, _currentDate.month + 1, 0).day;
  }

  int _getFirstWeekdayOfMonth() {
    return DateTime(_currentDate.year, _currentDate.month, 1).weekday - 1;
  }

  bool _isToday(DateTime date) {
    final now = DateTime.now();
    return date.year == now.year && date.month == now.month && date.day == now.day;
  }

  void _previousMonth() {
    setState(() {
      _currentDate = DateTime(_currentDate.year, _currentDate.month - 1, 1);
    });
  }

  void _nextMonth() {
    setState(() {
      _currentDate = DateTime(_currentDate.year, _currentDate.month + 1, 1);
    });
  }

  void _onDayPressed(DateTime day) {
    if (_events.containsKey(day)) {
      // Показываем список тренировок
      _showEventsDialog(day);
    } else {
      // Показываем форму добавления тренировки
      _showAddEventDialog(day);
    }
  }

  void _showEventsDialog(DateTime day) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Тренировки на ${DateFormat('dd.MM.yyyy').format(day)}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: _events[day]!
              .map((event) => ListTile(
            title: Text(event),
            trailing: IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              onPressed: () {
                setState(() {
                  _events[day]!.remove(event);
                  if (_events[day]!.isEmpty) {
                    _events.remove(day);
                  }
                });
                Navigator.pop(context);
              },
            ),
          ))
              .toList(),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Закрыть'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _showAddEventDialog(day);
            },
            child: const Text('Добавить'),
          ),
        ],
      ),
    );
  }

  void _showAddEventDialog(DateTime day) {
    final textController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Добавить тренировку на ${DateFormat('dd.MM.yyyy').format(day)}'),
        content: TextField(
          controller: textController,
          decoration: const InputDecoration(
            labelText: 'Название тренировки',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Отмена'),
          ),
          ElevatedButton(
            onPressed: () {
              if (textController.text.isNotEmpty) {
                setState(() {
                  _events[day] ??= [];
                  _events[day]!.add(textController.text);
                });
                Navigator.pop(context);
              }
            },
            child: const Text('Добавить'),
          ),
        ],
      ),
    );
  }
}