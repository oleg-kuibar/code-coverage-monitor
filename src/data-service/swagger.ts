import * as swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
  },
  apis: ['./routes/*.ts'], // Replace with the path to your route files
};

const specs = swaggerJsdoc(options);

export default specs;
