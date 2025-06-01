import { env } from "@/config/env";
import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import scalarUi from "@scalar/fastify-api-reference";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { ErrorCodes, ErrorKeyCodes } from "./errors/error-codes";
import { loadRoutes } from "./routes";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			code: ErrorCodes.BAD_INPUT_FORMAT,
			reason: ErrorKeyCodes.BAD_INPUT_FORMAT,
			message: "Validation error",
			issues: error.validation.flatMap((issue) => ({
				issue: issue.params.issue.code,
				message: issue.params.issue.message,
				param: issue.params.issue.path[0],
			})),
		});
	}

	console.error(error);

	return reply.status(500).send({
		code: ErrorCodes.INTERNAL_SERVER_ERROR,
		reason: ErrorKeyCodes.INTERNAL_SERVER_ERROR,
		message: "Internal server error",
	});
});

server.register(fastifyCors, {
	origin: "*",
	methods: ["GET", "POST", "DELETE", "OPTIONS"],
});

server.register(fastifyMultipart);
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "brev.ly",
			description: "URL shortener API",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

server.register(scalarUi, {
	routePrefix: "/reference",
});

server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

await loadRoutes(server);

const port = env.PORT || 3333;
const host = "0.0.0.0";

server.listen({ port, host }).then(() => {
	console.log(`HTTP Server running on ${port}`);
});
