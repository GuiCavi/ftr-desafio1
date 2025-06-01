import { readdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { BASE_API_PREFIX } from "@/config/const";

import type { FastifyInstance } from "fastify";
import type { Route } from "./types/route";

const __dirname = path.join(import.meta.dirname, "infra/http/routes");

const loadFiles = async (): Promise<Route[]> => {
	try {
		const filesInDir = readdirSync(__dirname).filter((file) =>
			file.includes(".route."),
		);

		const routesWithContent: Route[] = [];

		for (const file of filesInDir) {
			const filePath = path.resolve(__dirname, file);
			const fileUrl = pathToFileURL(filePath).href;

			const content = await import(fileUrl);
			routesWithContent.push(content.default);
		}

		return routesWithContent;
	} catch (error) {
		console.log("🚀 ~ loadRoutes ~ loadFiles ~ error:", error);
		return [];
	}
};

export const loadRoutes = async (server: FastifyInstance) => {
	const routes = await loadFiles();

	for (const route of routes) {
		const options: Parameters<typeof server.register>[1] = {};

		if (!route.omitPrefix) {
			options.prefix = path.join(BASE_API_PREFIX, route.resource);
		}

		server.register(route.handler, options);
	}
};
