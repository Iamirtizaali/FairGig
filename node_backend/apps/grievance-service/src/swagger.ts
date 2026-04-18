import swaggerJsdoc from "swagger-jsdoc";

const serviceName = process.env.SERVICE_NAME ?? "FairGig Service";
const servicePort = process.env.PORT ?? "3000";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: `${serviceName} API`,
      version: "1.0.0"
    },
    servers: [
      {
        url: `http://localhost:${servicePort}`
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
});
