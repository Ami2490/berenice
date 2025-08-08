from src.models.user import db
from datetime import datetime
import json

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    sizes_json = db.Column(db.Text)  # JSON string para almacenar tallas
    image_url = db.Column(db.String(500))
    featured = db.Column(db.Boolean, default=False)
    in_stock = db.Column(db.Boolean, default=True)
    stock_quantity = db.Column(db.Integer, default=0)
    rating = db.Column(db.Float, default=0.0)
    reviews_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relación con pedidos
    order_items = db.relationship('OrderItem', backref='product', lazy=True)
    
    @property
    def sizes(self):
        """Convierte el JSON de tallas a lista"""
        if self.sizes_json:
            return json.loads(self.sizes_json)
        return []
    
    @sizes.setter
    def sizes(self, value):
        """Convierte la lista de tallas a JSON"""
        self.sizes_json = json.dumps(value)
    
    def to_dict(self):
        """Convierte el producto a diccionario para JSON"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'sizes': self.sizes,
            'image': self.image_url,
            'featured': self.featured,
            'inStock': self.in_stock,
            'stockQuantity': self.stock_quantity,
            'rating': self.rating,
            'reviews': self.reviews_count,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None
        }

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_phone = db.Column(db.String(20), nullable=False)
    customer_email = db.Column(db.String(100))
    customer_address = db.Column(db.Text)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, confirmed, shipped, delivered, cancelled
    payment_method = db.Column(db.String(20), default='whatsapp')
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relación con items del pedido
    items = db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convierte el pedido a diccionario para JSON"""
        return {
            'id': self.id,
            'customerName': self.customer_name,
            'customerPhone': self.customer_phone,
            'customerEmail': self.customer_email,
            'customerAddress': self.customer_address,
            'totalAmount': self.total_amount,
            'status': self.status,
            'paymentMethod': self.payment_method,
            'notes': self.notes,
            'items': [item.to_dict() for item in self.items],
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None
        }

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    size = db.Column(db.String(10), nullable=False)
    unit_price = db.Column(db.Float, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    
    def to_dict(self):
        """Convierte el item del pedido a diccionario para JSON"""
        return {
            'id': self.id,
            'productId': self.product_id,
            'productName': self.product.name if self.product else None,
            'quantity': self.quantity,
            'size': self.size,
            'unitPrice': self.unit_price,
            'totalPrice': self.total_price
        }

class Customer(db.Model):
    __tablename__ = 'customers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(100))
    address = db.Column(db.Text)
    total_orders = db.Column(db.Integer, default=0)
    total_spent = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_order_at = db.Column(db.DateTime)
    
    def to_dict(self):
        """Convierte el cliente a diccionario para JSON"""
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'email': self.email,
            'address': self.address,
            'totalOrders': self.total_orders,
            'totalSpent': self.total_spent,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'lastOrderAt': self.last_order_at.isoformat() if self.last_order_at else None
        }

