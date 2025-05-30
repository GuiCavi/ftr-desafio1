import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export type Route = {
	resource: string;
	handler: FastifyPluginAsyncZod;
	omitPrefix?: boolean;
};
