import { readdirSync } from "node:fs";
import path from "node:path";

import { BASE_API_PREFIX } from "@/config/const";

import type { Route } from "./types/route";
import type { FastifyInstance } from "fastify";

const loadFiles = () => {
  try {
    const filesInDir = readdirSync(__dirname)
      .filter(file => file.includes(".route."));

    const routesWithContent: Route[] = [];

    for (const file of filesInDir) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
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

  routes?.forEach(route => {
    server.register(route.handler, { prefix: path.join(BASE_API_PREFIX, route.resource) });
  });
};
