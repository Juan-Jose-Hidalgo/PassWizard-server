# 🚀 ***PassWizard API*** 🧙‍♂️
### 🇬🇧 [English](../README.md) | 🇪🇸 Español
PassWizard API es una API REST escrita en TypeScript con Node.js y Express.js. La función de esta API es servir como servidor para la aplicación cliente **PassWizard**, la cual puedes encontrar **[aquí](https://github.com/Juan-Jose-Hidalgo/PassWizard)**. Esta API proporciona diferentes endpoints para que PassWizard pueda gestionar usuarios y contraseñas, incluyendo operaciones CRUD tanto para usuarios como para contraseñas generadas por los usuarios.

---
## 🗄️ ***Base de datos***
La aplicación utiliza PostgreSQL como gestor de base de datos, en su versión 14.7. Si deseas utilizar otro gestor de base de datos, debes modificar el archivo src/database/database.conexion.ts y configurar el objeto dialectOptions para que coincida con las opciones de tu gestor de base de datos. Ejemplo para el uso de mysql:
```typescript
export const sequelize = new Sequelize(`mysql://${user}:${pass}@${host}:${port}/${db}`, {
  dialect: 'mysql',
  logging: false
});
```
La aplicación utiliza el ORM Sequelize, por lo que es compatible con varios gestores de bases de datos como MySQL, SQLite y MariaDB. Para obtener más información sobre cómo configurar Sequelize, consulta la documentación oficial.

---
## 🌐 ***Variables de entorno***
Para que la aplicación se pueda ejecutar de manera adecuada, es necesario declarar las siguientes variables de entorno en un archivo .env en la raíz del proyecto:
### **Variables para la conexión a la base de datos**
- PASSWORDDB: contraseña de la base de datos.
- PGDATABASE: nombre de la base de datos.
- PGHOST: nombre del host de la base de datos.
- PGPASSWORD: contraseña del usuario de la base de datos.
- PGPORT: puerto en el que está corriendo PostgreSQL.
- PGUSER: nombre del usuario de la base de datos.
<br></br>
### **Variables para la configuración del servidor**
- PORT: puerto en el que se ejecutará la aplicación.
- JWT_SECRET: clave secreta para firmar y verificar tokens JWT.
---

## 🌐 ***Despliegue en Railway***
Si quieres utilizar esta aplicación en línea, es posible desplegarla en Railway siguiendo los siguientes pasos:
1. Crea una cuenta en Railway.
2. Crea un nuevo proyecto en Railway.
3. Añade una base de datos PostgreSQL a tu proyecto.
4. Añade un servidor Node.js a tu proyecto.
5. Declara las variables de entorno necesarias para la aplicación (ver sección anterior).
6. Configura los puertos y el tipo de servidor.
---
## 🚀 ***Ejecución local***
Si prefieres ejecutar la aplicación localmente, puedes hacerlo siguiendo los siguientes pasos:
1. Clona este repositorio en tu máquina local.
2. Ejecuta npm install para instalar las dependencias.
3. Crea una base de datos PostgreSQL en tu máquina local y asegúrate de tener las variables de entorno necesarias (ver sección anterior).
4. Ejecuta npm run dev para iniciar el servidor en modo de desarrollo.
5. Si quieres ejecutar el servidor en modo producción, debes ejecutar npm run build y luego npm start.
---
## 📜 ***Scripts***
Los siguientes scripts están disponibles en este proyecto:
- dev: Ejecuta el servidor en modo de desarrollo usando nodemon.
- build: Compila los archivos TypeScript a JavaScript en la carpeta "dist".
- start: Ejecuta el servidor en modo producción, utilizando los archivos compilados en la carpeta "dist".
---
## ***Datos del autor*** 👨‍💻
#### 🙋‍♂️ Nombre: Juan José Hidalgo
#### 🐙 GitHub: https://github.com/Juan-Jose-Hidalgo
#### 💼 Visita mi perfil en [LinkedIn](https://www.linkedin.com/in/juan-jos%C3%A9-hidalgo-ya%C3%B1ez-854698b4/)
#### 📨 Correo electrónico: juanhidalgoyanez@gmail.com
---
## 📝 ***Licencia***
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENCIA](./LICENCIA.md) para más detalles.