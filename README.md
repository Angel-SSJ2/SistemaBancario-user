# SistemaBancario-user
# 🏦 SistemaBancario-user

## 🚀 Requerimientos del Sistema
### 🧾 API de Gestión de Usuarios y Transacciones

---

## 🌐 1. Descripción General del Sistema

El sistema desarrollado consiste en una API REST diseñada para la administración de usuarios y la gestión de transacciones entre los mismos dentro de una plataforma digital segura 🔐.

Esta aplicación permite que nuevos usuarios puedan registrarse dentro del sistema proporcionando sus datos personales básicos, así como iniciar sesión mediante el uso de credenciales previamente registradas.

Una vez autenticado, el usuario tendrá acceso a funcionalidades protegidas, tales como la consulta de su historial de transacciones realizadas con otros usuarios dentro de la plataforma 💸.

El sistema implementa una arquitectura basada en el modelo:

- Modelo
- Vista
- Controlador (MVC)

Esto permite una correcta organización del código fuente y facilita la separación entre la lógica de negocio, el manejo de datos y la gestión de solicitudes realizadas por el cliente.

Adicionalmente, se incorpora un sistema de autenticación basado en JSON Web Token (JWT), con el objetivo de garantizar que únicamente los usuarios autorizados puedan acceder a la información protegida dentro del sistema 🛡️.

---

## 🎯 2. Alcance del Sistema

El sistema permitirá la gestión integral de usuarios registrados dentro de la plataforma, así como el registro y consulta de transacciones realizadas entre los mismos.

Cada usuario podrá:

- ✅ Registrarse dentro del sistema  
- ✅ Iniciar sesión mediante sus credenciales  
- ✅ Realizar transacciones hacia otros usuarios  
- ✅ Recibir transacciones de otros usuarios  
- ✅ Consultar su historial de movimientos  

Las transacciones estarán asociadas directamente a un usuario emisor y un usuario receptor, registrando información relevante como:

- 💰 Monto transferido  
- 🗒️ Descripción de la operación  
- 📅 Fecha de realización  

---

## 👥 3. Actores del Sistema

| Actor        | Descripción                                                                 |
|-------------|-----------------------------------------------------------------------------|
| 🧑 Cliente   | Usuario registrado que puede realizar y consultar transacciones dentro del sistema.|

---

## ⚙️ 4. Requerimientos Funcionales

### 📝 RF-01 Registro de Usuarios

El sistema deberá permitir el registro de nuevos usuarios mediante el ingreso de la siguiente información:

- Nombre  
- Apellido  
- Correo electrónico 📧  
- Contraseña 🔑  
- Rol dentro del sistema  

Las contraseñas deberán ser cifradas antes de ser almacenadas en la base de datos.

---

### 🔐 RF-02 Autenticación de Usuarios

El sistema deberá permitir a los usuarios iniciar sesión mediante su correo electrónico y contraseña previamente registrada.

Una vez verificadas las credenciales, el sistema generará automáticamente un token de autenticación que permitirá al usuario acceder a las funcionalidades protegidas del sistema.

---

### 💳 RF-03 Gestión de Transacciones

El sistema deberá permitir registrar transacciones realizadas entre usuarios previamente registrados dentro de la plataforma.

Cada transacción deberá incluir la siguiente información:

- Usuario emisor 👤  
- Usuario receptor 👥  
- Monto de la transacción 💰  
- Descripción de la operación 🗒️  
- Fecha de realización 📆  

---

### 📊 RF-04 Consulta de Historial de Transacciones

El sistema deberá permitir a los usuarios autenticados consultar el historial de transacciones en las cuales participan, ya sea como emisores o receptores.

---

### 🛡️ RF-05 Protección de Rutas

El sistema deberá proteger los endpoints relacionados con la consulta de información de transacciones mediante mecanismos de validación de token.

---

## 📌 5. Requerimientos No Funcionales

### 🔒 RNF-01 Seguridad
El sistema deberá implementar mecanismos de cifrado para el almacenamiento de contraseñas.

---

### 🧾 RNF-02 Autenticación y Autorización
El acceso a los recursos protegidos deberá estar controlado mediante el uso de JSON Web Token (JWT).

---

### 📈 RNF-03 Integridad de Datos
El sistema deberá evitar la duplicidad de registros mediante la validación de campos únicos, tales como el correo electrónico.

---

### 🌍 RNF-04 Disponibilidad
El sistema deberá estar disponible para atender solicitudes realizadas por los usuarios en cualquier momento.

---

### 🙈 RNF-05 Confidencialidad
El sistema no deberá exponer información sensible del usuario, como contraseñas, dentro de las respuestas generadas por la API.
