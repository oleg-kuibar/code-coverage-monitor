import * as swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Code Coverage API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001', // Replace with your actual server URL
    },
  ],
  apis: ['./src/routes/*.ts'], // Replace with the path to your route files
};

const specs = swaggerJsdoc(options);

export default specs;
