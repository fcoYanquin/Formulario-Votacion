# Formulario-Votacion
Formulario de registro usando base de datos mysql y diversas validaciones

## Requerimientos
- Mysql: 8.0.33
- PHP: 8.0.0

## Intalacion y configuración
- Abrir la carpeta sql ubicada en la raíz del proyecto
- Exportar el archivo votacion.sql a su intalación de base de datos, ejecutando el siguiente comando:
```sh
mysql --user=<su_usuario> -p <nombre_base_de_datos> < <ruta_archivo/votacion.sql>
```
- Se le pedirá su contraseña de acceso a la base de datos
- Una vez exportado, abrir el archivo config/configuracion.php e ingresar datos de su instalación a mysql \
    **hostname**: Servidor de base de datos \
    **user**: Usuario de la base de datos \
    **password**: Contraseña de la base de datos \
    **database**: Nombre de la base de datos definido al exportar el archivo sql \

- Ingresar al proyecto a traves delñ navegador
