const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cake Shop API',
      version: '1.0.0',
      description: 'API for managing users, products, and orders in the Cake Shop.',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Local server',
      },
      {
        url: 'https://13.127.23.163',
        description: 'EC2 server'
      }
    ],
  },
  apis: ['./routes/*.js'], // Points to the route files
};

const specs = swaggerJsDoc(options);

module.exports = specs;
