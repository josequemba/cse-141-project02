const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');

const doc = {
    info: {
      title: 'Books API',
      description: 'API documentation for Book routes.',
    },
    host: 'localhost:8080',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    app.listen(8080, () => {
        console.log('Server is running on port 8080.');
    });
});