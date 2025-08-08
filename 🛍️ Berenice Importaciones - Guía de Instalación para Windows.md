# 🛍️ Berenice Importaciones - Guía de Instalación para Windows

Esta guía te ayudará a ejecutar la tienda online de Berenice Importaciones en tu servidor local de Windows.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 18 o superior)
   - Descarga desde: https://nodejs.org/
   - Verifica la instalación: `node --version`

2. **Python** (versión 3.8 o superior)
   - Descarga desde: https://www.python.org/downloads/
   - ⚠️ **IMPORTANTE**: Durante la instalación, marca la opción "Add Python to PATH"
   - Verifica la instalación: `python --version`

3. **Git** (opcional, para clonar el repositorio)
   - Descarga desde: https://git-scm.com/download/win

## 📁 Estructura del Proyecto

```
berenice_store/
├── frontend/          # Aplicación React (Tienda online)
├── backend/           # Aplicación Flask (API y Panel Admin)
├── assets/           # Imágenes y recursos
└── INSTRUCCIONES_INSTALACION_WINDOWS.md
```

## 🚀 Instalación Paso a Paso

### Paso 1: Preparar el Proyecto

1. **Descargar el proyecto**
   - Si tienes Git: `git clone [URL_DEL_REPOSITORIO]`
   - O descarga el archivo ZIP y extráelo

2. **Abrir terminal/PowerShell**
   - Presiona `Win + R`, escribe `cmd` y presiona Enter
   - O busca "PowerShell" en el menú de inicio

3. **Navegar al directorio del proyecto**
   ```bash
   cd ruta\donde\descargaste\berenice_store
   ```

### Paso 2: Configurar el Backend (API y Panel de Administrador)

1. **Navegar al directorio del backend**
   ```bash
   cd backend
   ```

2. **Crear entorno virtual de Python**
   ```bash
   python -m venv venv
   ```

3. **Activar el entorno virtual**
   ```bash
   # En Command Prompt (cmd)
   venv\Scripts\activate
   
   # En PowerShell
   venv\Scripts\Activate.ps1
   ```
   
   ⚠️ **Nota**: Si PowerShell da error de permisos, ejecuta:
   ```bash
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

4. **Instalar dependencias de Python**
   ```bash
   pip install -r requirements.txt
   ```

5. **Inicializar la base de datos**
   ```bash
   python src\main.py
   ```
   
   ✅ **Resultado esperado**: Verás el mensaje "Productos de ejemplo creados exitosamente" y el servidor iniciará en http://localhost:5000

6. **Mantener esta terminal abierta** - El backend debe seguir ejecutándose

### Paso 3: Configurar el Frontend (Tienda Online)

1. **Abrir una NUEVA terminal/PowerShell** (mantén la anterior abierta)

2. **Navegar al directorio del frontend**
   ```bash
   cd ruta\donde\descargaste\berenice_store\frontend
   ```

3. **Instalar dependencias de Node.js**
   ```bash
   npm install
   ```
   
   O si prefieres usar pnpm:
   ```bash
   npm install -g pnpm
   pnpm install
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   
   O con pnpm:
   ```bash
   pnpm run dev
   ```

   ✅ **Resultado esperado**: El servidor iniciará en http://localhost:5173

## 🌐 Acceder a la Aplicación

Una vez que ambos servidores estén ejecutándose:

### 🛒 Tienda Online (Frontend)
- **URL**: http://localhost:5173
- **Funcionalidades**:
  - Catálogo de productos
  - Carrito de compras
  - Integración con WhatsApp
  - Diseño responsive

### 👨‍💼 Panel de Administrador
- **URL**: http://localhost:5000/admin.html
- **Funcionalidades**:
  - Dashboard con estadísticas
  - Gestión de productos (crear, editar, eliminar)
  - Visualización de pedidos
  - Gestión de clientes

### 🔌 API Backend
- **URL Base**: http://localhost:5000/api
- **Endpoints disponibles**:
  - `GET /api/products` - Listar productos
  - `POST /api/products` - Crear producto
  - `GET /api/orders` - Listar pedidos
  - `POST /api/orders` - Crear pedido

## ⚙️ Configuración Adicional

### Cambiar Número de WhatsApp

1. Edita el archivo `frontend\src\data\api.js`
2. Busca la línea: `const phoneNumber = '59899123456';`
3. Cambia el número por el tuyo (formato internacional sin +)

### Personalizar Colores de Marca

1. Edita el archivo `frontend\src\App.css`
2. Busca las variables CSS con `--berenice-gold`
3. Cambia los valores hexadecimales por tus colores preferidos

## 🛠️ Solución de Problemas Comunes

### Error: "python no se reconoce como comando"
- **Solución**: Reinstala Python marcando "Add Python to PATH"
- O agrega manualmente Python al PATH de Windows

### Error: "npm no se reconoce como comando"
- **Solución**: Reinstala Node.js desde el sitio oficial
- Reinicia la terminal después de la instalación

### Error de permisos en PowerShell
- **Solución**: Ejecuta como administrador:
  ```bash
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### El frontend no carga productos
- **Verificación**: Asegúrate de que el backend esté ejecutándose en http://localhost:5000
- **Solución**: Reinicia ambos servidores

### Puerto ocupado
- **Error**: "Port 5000 is already in use"
- **Solución**: 
  1. Cierra otras aplicaciones que usen el puerto
  2. O cambia el puerto en `backend\src\main.py` línea final

## 📱 Funcionalidades Principales

### Para Clientes:
- ✅ Navegación por categorías (Mujeres, Hombres, Niños, Pijamas)
- ✅ Búsqueda de productos
- ✅ Carrito de compras funcional
- ✅ Finalización de compra por WhatsApp
- ✅ Diseño responsive (móvil y desktop)
- ✅ Botón flotante de WhatsApp

### Para Administradores:
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Gestión completa de productos
- ✅ Visualización de pedidos
- ✅ Gestión de clientes
- ✅ Interfaz intuitiva y fácil de usar

## 🔄 Comandos de Uso Diario

### Iniciar la aplicación completa:

1. **Terminal 1 (Backend)**:
   ```bash
   cd berenice_store\backend
   venv\Scripts\activate
   python src\main.py
   ```

2. **Terminal 2 (Frontend)**:
   ```bash
   cd berenice_store\frontend
   npm run dev
   ```

### Detener los servidores:
- Presiona `Ctrl + C` en cada terminal

## 📞 Soporte

Si encuentras algún problema durante la instalación:

1. Verifica que todos los requisitos previos estén instalados correctamente
2. Asegúrate de que los puertos 5000 y 5173 estén disponibles
3. Revisa que ambos servidores estén ejecutándose simultáneamente

## 🎉 ¡Listo!

Tu tienda online de Berenice Importaciones está ahora funcionando localmente. Puedes:

- Personalizar productos desde el panel de administrador
- Probar el flujo de compra completo
- Modificar el diseño según tus necesidades
- Integrar con tu número de WhatsApp real

---

**Desarrollado para Berenice Importaciones** 🛍️✨

