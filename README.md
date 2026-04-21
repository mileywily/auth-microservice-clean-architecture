# AuthCore - Sistema de Autenticación Agnóstico

## Descripción

AuthCore es un sistema de autenticación agnóstico diseñado para proporcionar una solución flexible y escalable para la gestión de usuarios y autenticación en aplicaciones modernas. Construido con NestJS y TypeScript, este proyecto implementa una arquitectura limpia que permite la integración con diferentes frameworks y bases de datos.

## Arquitectura

El proyecto aplica la Arquitectura Limpia (Clean Architecture), también conocida como Arquitectura Hexagonal o Puertos y Adaptadores. Esta arquitectura separa la lógica de negocio del framework y la base de datos, promoviendo la independencia y la mantenibilidad del código. Los puertos definen interfaces abstractas, mientras que los adaptadores implementan estas interfaces para interactuar con tecnologías específicas.

## Principios de Diseño

Se han aplicado los principios SOLID para asegurar un diseño robusto y extensible:

- **Principio de Inversión de Dependencias (DIP)**: Las dependencias de alto nivel no dependen de módulos de bajo nivel, sino de abstracciones.
- **Principio de Responsabilidad Única (SRP)**: Cada caso de uso tiene una única responsabilidad, facilitando el mantenimiento y las pruebas.

## Calidad y Testing

El enfoque en la calidad del código se refleja en el uso de Jest para pruebas unitarias y de extremo a extremo (E2E). Las pruebas siguen el patrón Arrange, Act & Assert (AAA), asegurando que el código sea confiable y libre de errores.

## DevOps / Producción

- **Dockerfile Multi-etapa**: Utiliza un Dockerfile multi-stage para crear imágenes ligeras y optimizadas para producción, reduciendo el tamaño de la imagen final.
- **Graceful Shutdown**: Implementa el apagado elegante para interceptar señales del sistema como SIGTERM, permitiendo una terminación ordenada de procesos y liberación de recursos.

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

```bash
npm install
```

## Uso

### Desarrollo

Para ejecutar el proyecto en modo desarrollo con recarga automática:

```bash
npm run start:dev
```

### Producción

Para construir y ejecutar en modo producción:

```bash
npm run build
npm run start:prod
```

### Docker

Para construir la imagen Docker:

```bash
docker build -t authcore .
```

Para ejecutar el contenedor:

```bash
docker run -p 3000:3000 authcore
```

### Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm run test
```

Para pruebas E2E:

```bash
npm run test:e2e
```

## Licencia

Este proyecto está bajo la Licencia MIT.
