import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.user import db
from src.models.product import Product, Order, OrderItem, Customer
from src.routes.user import user_bp
from src.routes.products import products_bp, orders_bp, customers_bp, stats_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Habilitar CORS para todas las rutas
CORS(app)

# Registrar blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(products_bp, url_prefix='/api')
app.register_blueprint(orders_bp, url_prefix='/api')
app.register_blueprint(customers_bp, url_prefix='/api')
app.register_blueprint(stats_bp, url_prefix='/api')

# Configuración de base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()
    
    # Crear productos de ejemplo si no existen
    if Product.query.count() == 0:
        sample_products = [
            {
                'name': 'Conjunto de Brasier y Panty Clásico',
                'description': 'Conjunto clásico de brasier y panty en algodón suave. Ideal para uso diario con excelente comodidad y ajuste.',
                'price': 1250,
                'category': 'mujeres',
                'sizes': ['S', 'M', 'L', 'XL'],
                'image_url': '/images/mujeres/conjunto-clasico.jpg',
                'featured': True,
                'stock_quantity': 50,
                'rating': 4.5,
                'reviews_count': 23
            },
            {
                'name': 'Brasieres Sin Costuras Pack x3',
                'description': 'Pack de 3 brasieres sin costuras en colores variados. Tecnología seamless para máxima comodidad.',
                'price': 890,
                'category': 'mujeres',
                'sizes': ['S', 'M', 'L', 'XL'],
                'image_url': '/images/mujeres/brasieres-pack.jpg',
                'featured': True,
                'stock_quantity': 30,
                'rating': 4.7,
                'reviews_count': 45
            },
            {
                'name': 'Boxers Clásicos Pack x5',
                'description': 'Pack de 5 boxers clásicos en algodón 100%. Diseño cómodo y duradero para uso diario.',
                'price': 980,
                'category': 'hombres',
                'sizes': ['S', 'M', 'L', 'XL', 'XXL'],
                'image_url': '/images/hombres/boxers-pack.jpg',
                'featured': True,
                'stock_quantity': 40,
                'rating': 4.6,
                'reviews_count': 67
            },
            {
                'name': 'Calzoncillos Calvin Klein Pack x3',
                'description': 'Pack de 3 calzoncillos Calvin Klein originales. Calidad premium con banda elástica de marca.',
                'price': 1850,
                'category': 'hombres',
                'sizes': ['S', 'M', 'L', 'XL'],
                'image_url': '/images/hombres/calvin-klein.jpg',
                'featured': True,
                'stock_quantity': 25,
                'rating': 4.8,
                'reviews_count': 89
            },
            {
                'name': 'Ropa Interior Infantil Unisex',
                'description': 'Conjunto de ropa interior infantil unisex en algodón hipoalergénico. Diseños divertidos y coloridos.',
                'price': 580,
                'category': 'ninos',
                'sizes': ['2-3 años', '4-5 años', '6-7 años', '8-9 años'],
                'image_url': '/images/ninos/infantil-unisex.jpg',
                'featured': True,
                'stock_quantity': 35,
                'rating': 4.4,
                'reviews_count': 42
            },
            {
                'name': 'Pijama de Invierno con Estampado',
                'description': 'Pijama de invierno en franela suave con estampados modernos. Perfecto para las noches frías.',
                'price': 1150,
                'category': 'pijamas',
                'sizes': ['S', 'M', 'L', 'XL'],
                'image_url': '/images/pijamas/invierno-estampado.jpg',
                'featured': True,
                'stock_quantity': 20,
                'rating': 4.3,
                'reviews_count': 38
            },
            {
                'name': 'Pijama Satinado Elegante',
                'description': 'Pijama satinado elegante para ocasiones especiales. Suave al tacto con acabados de lujo.',
                'price': 1680,
                'category': 'pijamas',
                'sizes': ['S', 'M', 'L'],
                'image_url': '/images/pijamas/satinado-elegante.jpg',
                'featured': True,
                'stock_quantity': 15,
                'rating': 4.7,
                'reviews_count': 29
            }
        ]
        
        for product_data in sample_products:
            product = Product(
                name=product_data['name'],
                description=product_data['description'],
                price=product_data['price'],
                category=product_data['category'],
                image_url=product_data['image_url'],
                featured=product_data['featured'],
                stock_quantity=product_data['stock_quantity'],
                rating=product_data['rating'],
                reviews_count=product_data['reviews_count']
            )
            product.sizes = product_data['sizes']
            db.session.add(product)
        
        db.session.commit()
        print("Productos de ejemplo creados exitosamente")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
