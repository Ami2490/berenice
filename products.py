from flask import Blueprint, request, jsonify
from src.models.product import db, Product, Order, OrderItem, Customer
from datetime import datetime
import json

products_bp = Blueprint('products', __name__)

# Rutas para productos
@products_bp.route('/products', methods=['GET'])
def get_products():
    """Obtener todos los productos con filtros opcionales"""
    try:
        category = request.args.get('category')
        featured = request.args.get('featured')
        search = request.args.get('search')
        
        query = Product.query
        
        if category and category != 'all':
            query = query.filter(Product.category == category)
        
        if featured == 'true':
            query = query.filter(Product.featured == True)
        
        if search:
            query = query.filter(
                Product.name.contains(search) | 
                Product.description.contains(search)
            )
        
        products = query.all()
        return jsonify([product.to_dict() for product in products])
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Obtener un producto específico"""
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict())
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/products', methods=['POST'])
def create_product():
    """Crear un nuevo producto"""
    try:
        data = request.get_json()
        
        product = Product(
            name=data['name'],
            description=data.get('description', ''),
            price=float(data['price']),
            category=data['category'],
            image_url=data.get('imageUrl', ''),
            featured=data.get('featured', False),
            in_stock=data.get('inStock', True),
            stock_quantity=int(data.get('stockQuantity', 0))
        )
        
        # Establecer tallas
        if 'sizes' in data:
            product.sizes = data['sizes']
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify(product.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@products_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Actualizar un producto existente"""
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = float(data.get('price', product.price))
        product.category = data.get('category', product.category)
        product.image_url = data.get('imageUrl', product.image_url)
        product.featured = data.get('featured', product.featured)
        product.in_stock = data.get('inStock', product.in_stock)
        product.stock_quantity = int(data.get('stockQuantity', product.stock_quantity))
        
        if 'sizes' in data:
            product.sizes = data['sizes']
        
        product.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify(product.to_dict())
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@products_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Eliminar un producto"""
    try:
        product = Product.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({'message': 'Producto eliminado exitosamente'})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Rutas para pedidos
orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/orders', methods=['GET'])
def get_orders():
    """Obtener todos los pedidos"""
    try:
        status = request.args.get('status')
        
        query = Order.query
        
        if status:
            query = query.filter(Order.status == status)
        
        orders = query.order_by(Order.created_at.desc()).all()
        return jsonify([order.to_dict() for order in orders])
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """Obtener un pedido específico"""
    try:
        order = Order.query.get_or_404(order_id)
        return jsonify(order.to_dict())
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders', methods=['POST'])
def create_order():
    """Crear un nuevo pedido"""
    try:
        data = request.get_json()
        
        # Crear o actualizar cliente
        customer = Customer.query.filter_by(phone=data['customerPhone']).first()
        if not customer:
            customer = Customer(
                name=data['customerName'],
                phone=data['customerPhone'],
                email=data.get('customerEmail', ''),
                address=data.get('customerAddress', '')
            )
            db.session.add(customer)
        else:
            customer.name = data['customerName']
            customer.email = data.get('customerEmail', customer.email)
            customer.address = data.get('customerAddress', customer.address)
        
        # Crear pedido
        order = Order(
            customer_name=data['customerName'],
            customer_phone=data['customerPhone'],
            customer_email=data.get('customerEmail', ''),
            customer_address=data.get('customerAddress', ''),
            total_amount=float(data['totalAmount']),
            notes=data.get('notes', '')
        )
        
        db.session.add(order)
        db.session.flush()  # Para obtener el ID del pedido
        
        # Crear items del pedido
        for item_data in data['items']:
            product = Product.query.get(item_data['productId'])
            if not product:
                raise ValueError(f"Producto {item_data['productId']} no encontrado")
            
            order_item = OrderItem(
                order_id=order.id,
                product_id=item_data['productId'],
                quantity=int(item_data['quantity']),
                size=item_data['size'],
                unit_price=float(item_data['unitPrice']),
                total_price=float(item_data['totalPrice'])
            )
            db.session.add(order_item)
        
        # Actualizar estadísticas del cliente
        customer.total_orders += 1
        customer.total_spent += order.total_amount
        customer.last_order_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify(order.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    """Actualizar el estado de un pedido"""
    try:
        order = Order.query.get_or_404(order_id)
        data = request.get_json()
        
        order.status = data.get('status', order.status)
        order.notes = data.get('notes', order.notes)
        order.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify(order.to_dict())
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Rutas para clientes
customers_bp = Blueprint('customers', __name__)

@customers_bp.route('/customers', methods=['GET'])
def get_customers():
    """Obtener todos los clientes"""
    try:
        customers = Customer.query.order_by(Customer.total_spent.desc()).all()
        return jsonify([customer.to_dict() for customer in customers])
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@customers_bp.route('/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    """Obtener un cliente específico"""
    try:
        customer = Customer.query.get_or_404(customer_id)
        return jsonify(customer.to_dict())
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rutas para estadísticas del dashboard
stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/stats/dashboard', methods=['GET'])
def get_dashboard_stats():
    """Obtener estadísticas para el dashboard"""
    try:
        total_products = Product.query.count()
        total_orders = Order.query.count()
        total_customers = Customer.query.count()
        
        # Pedidos pendientes
        pending_orders = Order.query.filter_by(status='pending').count()
        
        # Ventas totales
        total_sales = db.session.query(db.func.sum(Order.total_amount)).scalar() or 0
        
        # Productos más vendidos
        top_products = db.session.query(
            Product.name,
            db.func.sum(OrderItem.quantity).label('total_sold')
        ).join(OrderItem).group_by(Product.id).order_by(
            db.func.sum(OrderItem.quantity).desc()
        ).limit(5).all()
        
        # Ventas por categoría
        sales_by_category = db.session.query(
            Product.category,
            db.func.sum(OrderItem.total_price).label('total_sales')
        ).join(OrderItem).group_by(Product.category).all()
        
        return jsonify({
            'totalProducts': total_products,
            'totalOrders': total_orders,
            'totalCustomers': total_customers,
            'pendingOrders': pending_orders,
            'totalSales': total_sales,
            'topProducts': [{'name': name, 'totalSold': total} for name, total in top_products],
            'salesByCategory': [{'category': cat, 'totalSales': sales} for cat, sales in sales_by_category]
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

