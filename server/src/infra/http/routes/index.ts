import { readdirSync } from "node:fs";
import path from "node:path";

import { BASE_API_PREFIX } from "@/config/const";

import type { FastifyInstance, FastifyRegisterOptions } from "fastify";
import type { Route } from "./types/route";

const loadFiles = () => {
	try {
		const filesInDir = readdirSync(__dirname).filter((file) =>
			file.includes(".route."),
		);

		const routesWithContent: Route[] = [];

		for (const file of filesInDir) {
			const content = require(path.resolve(__dirname, file));

			routesWithContent.push(content.default);
		}

		return routesWithContent;
	} catch (error) {
		console.log("🚀 ~ loadRoutes ~ loadFiles ~ error:", error);
	}
};

export const loadRoutes = (server: FastifyInstance) => {
	const routes = loadFiles();

	if (routes) {
		for (const route of routes) {
			const options: Parameters<typeof server.register>[1] = {};

			if (!route.omitPrefix) {
				options.prefix = path.join(BASE_API_PREFIX, route.resource);
			}
			server.register(route.handler, options);
		}
	}
};
