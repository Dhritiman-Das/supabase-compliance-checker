// swagger.js
import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "User management and Supabase setup",
  },
  servers: [
    {
      url: "http://localhost:3333/",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./src/api/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
