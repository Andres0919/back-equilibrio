import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Configuración de Swagger para la aplicación Equilibrio
 *
 * Esta configuración establece la documentación OpenAPI/Swagger
 * para todos los endpoints de la API de transacciones financieras.
 */
export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Equilibrio API')
    .setDescription(
      'API para el manejo de transacciones financieras personales. ' +
        'Permite crear, consultar y gestionar transacciones de ingresos y gastos.',
    )
    .setVersion('1.0.0')
    .addTag(
      'transactions',
      'Operaciones relacionadas con transacciones financieras',
    )
    .addServer('http://localhost:3000', 'Servidor de desarrollo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customCssUrl: '/swagger-ui-custom.css',
    customSiteTitle: 'Equilibrio API Documentation',
  });

  // También crear un endpoint para obtener el JSON de OpenAPI
  SwaggerModule.setup('api-json', app, document);
}

// Ejemplo de uso en main.ts:
/*
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configurar Swagger
  setupSwagger(app);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('Swagger documentation: http://localhost:3000/api');
}
*/
