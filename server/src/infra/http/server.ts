import { env } from "@/config/env";
import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { hasZodFastifySchemaValidationErrors, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { loadRoutes } from "./routes";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.validation.flatMap(issue => ({
        issue: issue.params.issue.code,
        message: issue.params.issue.message,
        param: issue.params.issue.path[0],
      })),
    })
  }

  console.error(error);

  return reply.status(500).send({
    message: "Internal server error",
  });
});

server.register(fastifyCors, { origin: "*" });

server.register(fastifyMultipart);
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "brev.ly",
      description: "URL shortener API",
      version: "1.0.0",
    }
  },
  transform: jsonSchemaTransform,
});

server.register(require('@scalar/fastify-api-reference'), {
  routePrefix: '/reference',
})

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

loadRoutes(server);

const port = env.PORT || 3333;
const host = "0.0.0.0";

server
  .listen({ port, host })
  .then(() => {
    console.log(`HTTP Server running on ${port}`);
  });