# FilmAffinity Próximos Estrenos

Aplicación web fullstack que muestra los próximos estrenos en España, desarrollada como práctica universitaria para la asignatura Desarrollo de Aplicaciones Web.

## Estructura del Proyecto
```
filmaffinity-dra/
├── scripts/        # Script de web scraping y datos extraídos
├── frontend/       # Aplicación web Angular
├── backend/        # API REST con Spring Boot
└── docker-compose.yml
```

## Partes

### Script de Scraping
Script Node.js que extrae la sección "próximos estrenos" de FilmAffinity obteniendo el título, fecha de estreno, ID de película y enlace de cada film. El resultado se guarda en `peliculas.json`.

### Backend
API REST desarrollada con Spring Boot conectada a una base de datos PostgreSQL. Al arrancar, lee el fichero `peliculas.json` y carga las 200 películas en la base de datos. Expone endpoints para listar y buscar películas. Construido con Spring Data JPA y Spring Data REST.

### Frontend
Aplicación de página única desarrollada con Angular que consume la API del backend y muestra los próximos estrenos en una cuadrícula con tema oscuro y diseño responsivo. Cada tarjeta muestra el día de estreno, título, fecha completa y un enlace a la página de FilmAffinity. Incluye búsqueda por título y por día. Servido mediante Nginx en producción.

## Cómo Ejecutar

Requiere Docker y Docker Compose.
```bash
docker-compose build
docker-compose up
```

Para detener la aplicación:
```bash
docker-compose down
```

## Fuente de los Datos

Los datos de las películas se extraen de [FilmAffinity (UK)](https://www.filmaffinity.com/uk/cat_new_th_uk.html). Todos los datos pertenecen a FilmAffinity y se utilizan únicamente con fines educativos.

## Tecnologías Utilizadas

- **Frontend:** Angular, Nginx
- **Backend:** Spring Boot, Spring Data JPA, Spring Data REST
- **Base de datos:** PostgreSQL
- **Scraping:** Node.js
- **Despliegue:** Docker, Docker Compose

## Requisitos

Para ejecutar en local sin Docker:
- Node.js 22+
- Java 17+
- PostgreSQL 16+
- Angular CLI
