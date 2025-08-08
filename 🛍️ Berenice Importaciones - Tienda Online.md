# 🛍️ Berenice Importaciones - Tienda Online

Una tienda online completa desarrollada para Berenice Importaciones, especializada en ropa interior para mujeres, hombres y niños.

## ✨ Características Principales

### 🎨 Frontend (Tienda Online)
- **Diseño moderno y responsive** con colores dorados de la marca
- **Catálogo completo** con filtros por categoría y búsqueda
- **Carrito de compras** funcional con gestión de tallas y cantidades
- **Integración con WhatsApp** para finalizar compras
- **Animaciones suaves** en tarjetas de productos y elementos
- **Botón flotante de WhatsApp** para contacto directo
- **Reseñas y calificaciones** de productos
- **Carrusel de imágenes** en productos destacados

### 🔧 Backend (API y Panel Admin)
- **API REST completa** con endpoints para productos, pedidos y clientes
- **Panel de administrador intuitivo** para gestión completa
- **Base de datos SQLite** con modelos relacionales
- **Dashboard con estadísticas** en tiempo real
- **Gestión de inventario** y stock
- **Sistema de pedidos** integrado con WhatsApp

### 📱 Funcionalidades de Compra
- **Sin pasarela de pago** - Todo se finaliza por WhatsApp
- **Formulario de contacto** para datos del cliente
- **Generación automática** de mensajes de WhatsApp con detalles del pedido
- **Gestión de tallas** y cantidades por producto
- **Cálculo automático** de totales y subtotales

## 🏗️ Tecnologías Utilizadas

### Frontend
- **React 18** con Vite
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Context API** para gestión de estado del carrito
- **Lucide Icons** para iconografía

### Backend
- **Flask** (Python) para API REST
- **SQLAlchemy** para ORM y base de datos
- **Flask-CORS** para comunicación frontend-backend
- **SQLite** como base de datos

## 📁 Estructura del Proyecto

```
berenice_store/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── context/         # Context API (Carrito)
│   │   ├── data/           # API y datos estáticos
│   │   └── assets/         # Imágenes y recursos
│   ├── public/             # Archivos públicos
│   └── package.json        # Dependencias Node.js
├── backend/                 # Aplicación Flask
│   ├── src/
│   │   ├── models/         # Modelos de base de datos
│   │   ├── routes/         # Rutas de la API
│   │   ├── static/         # Panel de administrador
│   │   └── database/       # Base de datos SQLite
│   ├── venv/               # Entorno virtual Python
│   └── requirements.txt    # Dependencias Python
└── assets/                 # Imágenes de productos
```

## 🚀 Instalación y Uso

### Para Windows
Consulta el archivo `INSTRUCCIONES_INSTALACION_WINDOWS.md` para una guía detallada paso a paso.

### Instalación Rápida (Linux/Mac)

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd berenice_store
   ```

2. **Configurar Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python src/main.py
   ```

3. **Configurar Frontend** (nueva terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Acceder a la aplicación**
   - Tienda: http://localhost:5173
   - Panel Admin: http://localhost:5000/admin.html

## 🌐 URLs de Acceso

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Tienda Online** | http://localhost:5173 | Interfaz principal para clientes |
| **Panel Admin** | http://localhost:5000/admin.html | Gestión de productos y pedidos |
| **API Backend** | http://localhost:5000/api | Endpoints REST |

## 📊 Funcionalidades del Panel de Administrador

### Dashboard
- **Estadísticas en tiempo real**: Total de productos, pedidos, clientes y ventas
- **Productos más vendidos**: Ranking de productos por cantidad vendida
- **Ventas por categoría**: Distribución de ventas por tipo de producto

### Gestión de Productos
- ✅ **Crear productos** con nombre, descripción, precio, categoría, tallas
- ✅ **Editar productos** existentes
- ✅ **Eliminar productos** del catálogo
- ✅ **Gestión de stock** y disponibilidad
- ✅ **Productos destacados** para la página principal

### Gestión de Pedidos
- ✅ **Visualizar todos los pedidos** realizados
- ✅ **Detalles completos** de cada pedido
- ✅ **Estados de pedidos** (pendiente, confirmado, enviado, entregado)
- ✅ **Información del cliente** asociada

### Gestión de Clientes
- ✅ **Base de datos de clientes** automática
- ✅ **Historial de compras** por cliente
- ✅ **Estadísticas de gasto** total por cliente

## 📱 Integración con WhatsApp

### Configuración del Número
1. Edita `frontend/src/data/api.js`
2. Cambia `const phoneNumber = '59899123456';` por tu número
3. Usa formato internacional sin el símbolo +

### Funcionalidades
- **Botón flotante** siempre visible para contacto
- **Finalización de compras** con mensaje automático
- **Detalles completos** del pedido en el mensaje
- **Información del cliente** incluida automáticamente

## 🎨 Personalización

### Colores de Marca
Los colores dorados de Berenice se pueden personalizar en:
- `frontend/src/App.css` - Variables CSS principales
- `backend/src/static/admin.html` - Estilos del panel admin

### Productos de Ejemplo
El sistema incluye 7 productos de ejemplo que se crean automáticamente:
- Conjuntos de ropa interior femenina
- Packs de boxers masculinos
- Ropa interior infantil
- Pijamas de diferentes estilos

## 🔧 API Endpoints

### Productos
- `GET /api/products` - Listar productos (con filtros opcionales)
- `GET /api/products/{id}` - Obtener producto específico
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/{id}` - Actualizar producto
- `DELETE /api/products/{id}` - Eliminar producto

### Pedidos
- `GET /api/orders` - Listar pedidos
- `POST /api/orders` - Crear nuevo pedido
- `PUT /api/orders/{id}` - Actualizar estado de pedido

### Clientes
- `GET /api/customers` - Listar clientes
- `GET /api/customers/{id}` - Obtener cliente específico

### Estadísticas
- `GET /api/stats/dashboard` - Estadísticas para el dashboard

## 🛡️ Características de Seguridad

- **CORS habilitado** para comunicación frontend-backend
- **Validación de datos** en formularios
- **Manejo de errores** robusto
- **Sanitización de inputs** en la API

## 📈 Escalabilidad

El proyecto está diseñado para ser fácilmente escalable:

- **Base de datos**: Fácil migración de SQLite a PostgreSQL/MySQL
- **Frontend**: Componentes modulares y reutilizables
- **Backend**: Arquitectura MVC clara y extensible
- **Despliegue**: Preparado para servicios cloud

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto fue desarrollado específicamente para Berenice Importaciones.

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para Berenice Importaciones** 🛍️✨

