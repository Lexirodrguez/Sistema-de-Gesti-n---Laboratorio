# Sistema de Gestión - Laboratorio

## Configuración del Entorno
Para que el sistema funcione correctamente, se debe crear un archivo llamado `.env` en la raíz del proyecto con el siguiente formato:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=laboratorio
JWT_SECRET=tu_frase_secreta_para_jwt
PORT=3000
```

## Seguridad y Roles
- El sistema utiliza **JWT (JSON Web Tokens)** para asegurar el acceso, los cuales se almacenan automáticamente en **cookies** del navegador.
- **Bioanalista**: Tiene acceso total al sistema, incluyendo registro de usuarios, edición y eliminación de datos.
- **Secretaria**: Puede ver pacientes, registrar nuevos pacientes, añadir exámenes, editarlos, eliminarlos y por otro lado puede ver resultados y eliminarlos. No tiene permiso para rellenar formularios de examenes.

## Usuarios por Defecto
- Usuario: `bioanalista`
- Contraseña: `123456`

## Rutas de Autenticación
- GET `/auth/login`: Muestra el formulario de ingreso.
- POST `/auth/login`: Procesa las credenciales y genera la cookie de sesión.
- GET `/auth/logout`: Cierra la sesión y elimina la cookie.


## Validación de Datos
Todas las rutas validan que los campos obligatorios estén presentes. Si falta algún dato, se responderá con un error 400 y un mensaje indicativo.
