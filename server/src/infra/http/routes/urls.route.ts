import { listUrls } from "@/core/list-urls";
import { storeUrl } from "@/core/store-url";
import { isSuccess, unwrapEither } from "@/shared/either";
import {
	ShortUrlValidationSchema,
	UrlValidationSchema,
} from "@/shared/validations/url-schema";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { ErrorCodes, ErrorKeyCodes } from "../errors/error-codes";
import type { Route } from "./types/route";

const UrlResponseSchema = z.object({
	id: z.string().uuid().describe("ID of the shortened URL"),
	url: UrlValidationSchema.describe("Original URL"),
	shortUrl: ShortUrlValidationSchema.describe("Shortened URL segment"),
	createdAt: z.date().describe("Creation date of the shortened URL"),
	accessCount: z.number().describe("Number of accesses to the shortened URL"),
});

const errorResponseSchema = (
	code: ErrorCodes,
	reason: ErrorKeyCodes,
	describe: string,
) =>
	z
		.object({
			code: z.literal(code).describe("The code for the error"),
			reason: z.literal(reason).describe("A reason for the error"),
			message: z.string().describe("Error message"),
		})
		.describe(describe);

const urlManagerRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/",
		{
			schema: {
				summary: "List all shorten URLs",
				response: {
					200: z.array(UrlResponseSchema).describe("List of shortened URLs"),
					400: errorResponseSchema(
						ErrorCodes.UNKNOWN_ERROR,
						ErrorKeyCodes.UNKNOWN_ERROR,
						"Unknown error",
					),
				},
			},
		},
		async (request, reply) => {
			const result = await listUrls();

			if (isSuccess(result)) {
				const urls = unwrapEither(result);
				return reply.status(200).send(urls);
			}

			const error = unwrapEither(result);
			return reply.status(400).send({
				code: error.errorCode,
				reason: error.errorKey,
				message: error.message,
			});
		},
	);

	server.post(
		"/",
		{
			schema: {
				summary: "Shorten a URL",
				body: z.object({
					url: UrlValidationSchema.describe("The URL to short"),
					shortUrl: ShortUrlValidationSchema.describe(
						"The URL pathname to store",
					),
				}),
				response: {
					201: UrlResponseSchema.describe("The URL was created successfully"),
					409: errorResponseSchema(
						ErrorCodes.URL_ALREADY_EXISTS,
						ErrorKeyCodes.URL_ALREADY_EXISTS,
						"The shorten URL already exists",
					),
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
			return reply.status(409).send({
				code: error.errorCode,
				reason: error.errorKey,
				message: error.message,
			});
		},
	);
};

export default {
	resource: "url",
	handler: urlManagerRoute,
} as Route;
