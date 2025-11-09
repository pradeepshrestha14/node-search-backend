import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "localhost";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Search API",
      version: "1.0.0",
      description: "API documentation for the Search Service",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? process.env.HOST + "/api" // <-- use deployed URL
            : `http://${HOST}:${PORT}/api`,
        description: `${process.env.NODE_ENV} server`,
      },
    ],
  },
  // Path to your route/controller files with JSDoc comments
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
