<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS API

This is a demo Todo API built using the following tech:

- NestJS
- PostgreSQL + Sequelize
- Swagger for API Documentation
- Adminer for PostgreSQL Admin

### API DOCS

API documentation are located at `/docs`

### Folder Structure

All code is inside the `/src` directory.

- `constants`: Constant values that can be used throughout the app.
- `core`: Core Configuration files like database configurations.
- `modules`: Contains all the modules in the application.
  - Each module is separated in its own directory. A basic structure of `auth` module is as follows:
  - `dto`: All Data Transfer Objects for the module
  - `guards`: Custom Guards that are a part of that module
  - `strategies`: Passport strategies

More Documentation:

- [Auth](/src/modules/auth/README.md)
