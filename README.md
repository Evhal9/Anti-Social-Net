# 🌐 AntiSocialNet — Red Social Universitaria

AntiSocialNet es una aplicación web inspirada en la comunidad universitaria de la **UNAHUR**, que permite a los usuarios registrarse, iniciar sesión, crear publicaciones, comentar y explorar contenido.  
Fue desarrollada con un enfoque **Full Stack**, utilizando **React + TypeScript** en el frontend y **Express + MongoDB** en el backend.

---

## 🚀 Características principales

- 🔐 Registro e inicio de sesión de usuarios.  
- 📝 Creación, visualización y eliminación de publicaciones.  
- 💬 Sistema de comentarios en cada publicación.  
- 🧑‍🤝‍🧑 Contextos globales para manejo de usuarios y posteos.  
- 🎨 Estilos personalizados y animaciones con CSS.  
- ⚙️ Integración con API REST creada en Express.  

---

## 🧰 Tecnologías utilizadas

### 🖥️ Frontend
- **React 18 + TypeScript**
- **Vite** (para un desarrollo rápido y eficiente)
- **React Router DOM**
- **Context API** para manejo global de estado
- **CSS Modules** para estilos por componente
- **Fetch API** para la comunicación con el backend

### 🧱 Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **CORS y dotenv**
- Arquitectura modular con controladores y rutas

---

## 🗂️ Estructura del proyecto

antisocialnet/
├─ src/
│  ├─ assets/                  # Imágenes y recursos visuales
│  ├─ components/              # Componentes reutilizables (Header, Footer, etc.)
│  ├─ context/                 # Contextos globales (UserContext, PostContext)
│  ├─ pages/                   # Páginas principales (Home, Login, Profile, AboutUs, etc.)
│  ├─ service/                 # Lógica de comunicación con la API
│  ├─ styles/                  # Estilos globales
│  ├─ types/                   # Tipado global de datos
│  └─ utils/                   # Constantes y funciones auxiliares

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
git clone https://github.com/tuusuario/antisocialnet.git
cd antisocialnet

### 2️⃣ Instalar dependencias
npm install

### 3️⃣ Ejecutar el frontend
npm run dev
La aplicación se ejecutará en http://localhost:5173

### 4️⃣ Ejecutar el backend (si lo tenés descargado)
backend https://github.com/EP-UnaHur-2025C2/anti-social-documental-grupo6
cd anti-social-documental-grupo6
npm install
npm run dev
El servidor Express se ejecutará en http://localhost:3000

---

## 📸 Capturas del proyecto

| Inicio | Crear Post | Perfil |
|:------:|:-----------:|:------:|
| ![Home](./src/assets/unahur1.jpg) | ![Post](./src/assets/unahur2.jpg) | ![Profile](./src/assets/unahur3.jpg) |

---

## 🧩 Arquitectura general

El frontend y el backend están separados, pero se comunican mediante **peticiones HTTP** a la API REST.  
- Los **posts** y **comentarios** se almacenan en **MongoDB**.  
- Las peticiones desde React se realizan mediante funciones centralizadas en `src/service/api.tsx`.  
- Se utilizan **contextos de React** para manejar el estado global del usuario y los posteos.

---

## 🔗 Endpoints principales del backend

| Método | Endpoint | Descripción |
|:--------|:----------|:-------------|
| POST | /users/register | Crea un nuevo usuario |
| POST | /users/login | Inicia sesión de usuario |
| GET | /users/:id | Obtiene un usuario por ID |
| GET | /posts | Lista todas las publicaciones |
| POST | /posts | Crea una nueva publicación |
| GET | /posts/:id | Obtiene un post específico |
| DELETE | /posts/:id | Elimina una publicación |
| POST | /posts/:id/add-comment | Agrega un comentario a un post |

---

## 🧑‍💻 Autores

Proyecto desarrollado por estudiantes de **UNAHUR**  
Santiago Lucas Diaz Noia
Nair Amira Paz
Melany Salerno Flores

---

## 📜 Licencia

Este proyecto es de uso educativo y libre para fines académicos.