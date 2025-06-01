import { getUrl } from "@/core/get-url";
import { isSuccess, unwrapEither } from "@/shared/either";
import {
	ShortUrlValidationSchema,
	UrlIdSchema,
	UrlValidationSchema,
} from "@/shared/validations/url-schema";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { ErrorCodes, ErrorKeyCodes } from "../errors/error-codes";
import { errorResponseSchema } from "./helpers/error-response-schema";
import type { Route } from "./types/route";

const UrlResponseSchema = z.object({
	id: UrlIdSchema.describe("ID of the shortened URL"),
	url: UrlValidationSchema.describe("Original URL"),
	shortUrl: ShortUrlValidationSchema.describe("Shortened URL segment"),
	createdAt: z.date().describe("Creation date of the shortened URL"),
	accessCount: z.number().describe("Number of accesses to the shortened URL"),
});

const accessUrlRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/:shortUrl",
		{
			schema: {
				summary: "Access a URL using its short_url",
				params: z.object({
					shortUrl: ShortUrlValidationSchema.describe(
						"ID of the shortened URL",
					),
				}),
				response: {
					303: z.undefined().describe("List of shortened URLs"),
					404: errorResponseSchema(
						ErrorCodes.URL_NOT_FOUND,
						ErrorKeyCodes.URL_NOT_FOUND,
						"The URL was not found",
					),
				},
			},
		},
		async (request, reply) => {
			const isPrefetch = request.headers.purpose === "prefetch";
			if (isPrefetch) {
				return reply.status(204).send();
			}

			const { shortUrl } = request.params;
			const result = await getUrl({ shortUrl });

			if (isSuccess(result)) {
				const url = unwrapEither(result);

				return reply
					.status(303)
					.header("Cache-Control", "no-store")
					.header("Pragma", "no-cache")
					.header("Expires", "0")
					.redirect(url.url);
			}

			const error = unwrapEither(result);
			return reply.status(404).send({
				code: error.errorCode,
				reason: error.errorKey,
				message: error.message,
			});
		},
	);
};

export default {
	resource: "a",
	handler: accessUrlRoute,
	omitPrefix: true,
} as Route;
