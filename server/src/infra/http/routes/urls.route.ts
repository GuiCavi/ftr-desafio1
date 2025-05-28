import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { Route } from "./types/route";
import { storeUrl } from "@/core/store-url";
import { isError, isSuccess, unwrapEither } from "@/shared/either";
import { db } from "@/infra/db";
import { Schemas } from "@/infra/db/schemas";
import { ErrorCodes, ErrorKeyCodes } from "../errors/error-codes";

const urlManagerRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/",
    {
      schema: {
        summary: "List all shorten URLs",
        response: {
          200: z.array(z.object({
            id: z.string().uuid().describe("ID of the shortened URL"),
            url: z.string().url().describe("Original URL"),
            shortUrl: z.string().min(1).max(100).regex(
              /^[a-zA-Z0-9\-._]+$/,
              "Invalid characters in URL segment"
            ),
            createdAt: z.date().describe("Creation date of the shortened URL"),
            accessCount: z.number().describe("Number of accesses to the shortened URL"),
          })).describe("List of shortened URLs"),
          409: z.object({
            code: z.literal(ErrorCodes.URL_ALREADY_EXISTS).describe("Error code for URL already exists"),
            reason: z.literal(ErrorKeyCodes.URL_ALREADY_EXISTS).describe("Reason for the error"),
            message: z.string().describe("Error message"),
          }).describe("The shortened URL already exists"),
        },
      },
    },
    async (request, reply) => {
      const urls = await db
        .select()
        .from(Schemas.url);

      return reply.status(200).send(urls);
    }
  ),
    server.post(
      "/",
      {
        schema: {
          summary: "Shorten a URL",
          body: z.object({
            url: z.string().url(),
            shortUrl: z.string().min(1).max(100).regex(
              /^[a-zA-Z0-9\-._]+$/,
              "Invalid characters in URL segment"
            )
          }),
          response: {
            201: z.object({
              id: z.string().uuid().describe("ID of the shortened URL"),
              url: z.string().url().describe("Original URL"),
              shortUrl: z.string().min(1).max(100).regex(
                /^[a-zA-Z0-9\-._]+$/,
                "Invalid characters in URL segment"
              ),
              createdAt: z.date().describe("Creation date of the shortened URL"),
              accessCount: z.number().describe("Number of accesses to the shortened URL"),
            }).describe("The URL was created successfully"),
            409: z.object({
              code: z.string().describe("Error code"),
              reason: z.string().describe("Reason for the error"),
              message: z.string().describe("Error message"),
            }).describe("The shortened URL already exists"),
            500: z.object({
              code: z.string().describe("Error code"),
              reason: z.string().describe("Reason for the error"),
              message: z.string().describe("Error message"),
            }).describe("There was a problem on the server side"),
          },
        },
      },
      async (request, reply) => {
        const { url, shortUrl } = request.body;

        const result = await storeUrl({
          url,
          shortUrl,
        });

        if (isSuccess(result)) {
          const createdUrl = unwrapEither(result);
          return reply.status(201).send(createdUrl);
        }

        const error = unwrapEither(result);
        return reply.status(400).send({
          code: error.errorCode,
          reason: error.errorKey,
          message: error.message,
        });
      });
};

export default {
  resource: "url",
  handler: urlManagerRoute,
} as Route;