import 'package:flutter/material.dart';

class Product {
  final String name;
  final String description;
  final double price;
  final String category;
  final IconData icon;
  bool isInCart;

  Product({
    required this.name,
    required this.description,
    required this.price,
    required this.category,
    required this.icon,
    this.isInCart = false,
  });
}

class ProductsScreen extends StatefulWidget {
  const ProductsScreen({super.key});

  @override
  _ProductsScreenState createState() => _ProductsScreenState();
}

class _ProductsScreenState extends State<ProductsScreen> {
  final List<Product> _allProducts = [
    Product(
      name: 'Протеин Whey',
      description: 'Сывороточный протеин 1 кг',
      price: 2499,
      category: 'Спортпит',
      icon: Icons.local_drink,
    ),
    Product(
      name: 'BCAA',
      description: 'Аминокислоты 500 г',
      price: 1599,
      category: 'Спортпит',
      icon: Icons.health_and_safety,
    ),
    Product(
      name: 'Креатин',
      description: 'Креатин моногидрат 300 г',
      price: 899,
      category: 'Спортпит',
      icon: Icons.science,
    ),
    Product(
      name: 'Гантели',
      description: 'Разборные гантели 20 кг',
      price: 3499,
      category: 'Инвентарь',
      icon: Icons.fitness_center,
    ),
    Product(
      name: 'Коврик',
      description: 'Йога-коврик 180 см',
      price: 1299,
      category: 'Инвентарь',
      icon: Icons.airline_seat_individual_suite,
    ),
    Product(
      name: 'Скакалка',
      description: 'Скоростная скакалка',
      price: 499,
      category: 'Инвентарь',
      icon: Icons.cable,
    ),
    Product(
      name: 'L-Карнитин',
      description: 'Жиросжигатель 100 мл',
      price: 799,
      category: 'Спортпит',
      icon: Icons.local_fire_department,
    ),
    Product(
      name: 'Эспандер',
      description: 'Набор резиновых эспандеров',
      price: 1499,
      category: 'Инвентарь',
      icon: Icons.code,
    ),
  ];

  late List<Product> _displayedProducts;
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _displayedProducts = List.from(_allProducts);
    _searchController.addListener(_onSearchChanged);
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _onSearchChanged() {
    final query = _searchController.text.toLowerCase();
    setState(() {
      _displayedProducts = _allProducts.where((product) {
        final nameMatch = product.name.toLowerCase().contains(query);
        final descMatch = product.description.toLowerCase().contains(query);
        final categoryMatch = product.category.toLowerCase().contains(query);
        return nameMatch || descMatch || categoryMatch;
      }).toList();
    });
  }

  void _toggleCartStatus(int index) {
    setState(() {
      _displayedProducts[index].isInCart = !_displayedProducts[index].isInCart;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Поиск товаров...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _displayedProducts.length,
              itemBuilder: (context, index) {
                final product = _displayedProducts[index];
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(
                    leading: Icon(product.icon, color: _getCategoryColor(product.category)),
                    title: Text(product.name),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(product.description),
                        const SizedBox(height: 4),
                        Text(
                          '${product.price.toStringAsFixed(2)} ₽',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.green,
                          ),
                        ),
                      ],
                    ),
                    trailing: IconButton(
                      icon: Icon(
                        product.isInCart ? Icons.shopping_cart : Icons.add_shopping_cart,
                        color: product.isInCart ? Colors.blue : Colors.grey,
                      ),
                      onPressed: () => _toggleCartStatus(index),
                    ),
                    onTap: () {
                      // Дополнительные действия при тапе на товар
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Переход в корзину
          final cartItems = _allProducts.where((p) => p.isInCart).toList();
          _showCartDialog(cartItems);
        },
        child: const Icon(Icons.shopping_cart),
      ),
    );
  }

  Color _getCategoryColor(String category) {
    return category == 'Спортпит' ? Colors.orange : Colors.blue;
  }

  void _showCartDialog(List<Product> cartItems) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Корзина'),
          content: SizedBox(
            width: double.maxFinite,
            child: cartItems.isEmpty
                ? const Text('Корзина пуста')
                : Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                ...cartItems.map((product) => ListTile(
                  leading: Icon(product.icon),
                  title: Text(product.name),
                  subtitle: Text('${product.price.toStringAsFixed(2)} ₽'),
                  trailing: IconButton(
                    icon: const Icon(Icons.remove_circle, color: Colors.red),
                    onPressed: () {
                      setState(() {
                        product.isInCart = false;
                      });
                      Navigator.pop(context);
                      _showCartDialog(_allProducts.where((p) => p.isInCart).toList());
                    },
                  ),
                )),
                const Divider(),
                Text(
                  'Итого: ${cartItems.fold(0.0, (sum, item) => sum + item.price).toStringAsFixed(2)} ₽',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  ),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Закрыть'),
            ),
            if (cartItems.isNotEmpty)
              ElevatedButton(
                onPressed: () {
                  // Оформление заказа
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Заказ оформлен!')),
                  );
                  setState(() {
                    for (var item in cartItems) {
                      item.isInCart = false;
                    }
                  });
                },
                child: const Text('Оформить заказ'),
              ),
          ],
        );
      },
    );
  }
}