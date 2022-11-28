Proyecto desafio login y registro redes-sociales

## Configuración inicial

Previo a la ejecución del proyecto se debe crear en el directorio raiz del mismo un archivo `.env` con 4 variables 
```
PORT=8080
NODE_ENV=local
NODE_URL="http://localhost:8080/"
SALT=$2b$10$8yXiHZej9hIp0Me8TzwhHe
MONGODB_URI=mongodb+srv://developer:xKC5-!M2BngHsNg@cluster0.lwkvzm9.mongodb.net/login?retryWrites=true&w=majority
```
Una vez configuradas las variables de entorno se debe ejecutar el siguiente comando para inicializar la aplicación

```
npm run dev
```
Para probar el formulario se debe ingresar al sgte enlace:

visit http://localhost:8080/

