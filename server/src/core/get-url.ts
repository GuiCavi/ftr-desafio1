import { db } from "@/infra/db";
import { Schemas } from "@/infra/db/schemas";
import type { URLTableModel } from "@/infra/db/schemas/url";
import { UnknownError } from "@/infra/http/errors/unknown-error";
import { URLNotFoundError } from "@/infra/http/errors/url-not-found";
import { type Either, makeError, makeSuccess } from "@/shared/either";
import { ShortUrlValidationSchema } from "@/shared/validations/url-schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

const GetUrlParams = z.object({
	shortUrl: ShortUrlValidationSchema,
});

type Params = z.infer<typeof GetUrlParams>;

export async function getUrl(
	params: Params,
): Promise<Either<UnknownError | URLNotFoundError, URLTableModel>> {
	try {
		const { shortUrl } = GetUrlParams.parse(params);

		const response = await db
			.update(Schemas.url)
			.set({
				accessCount: sql`${Schemas.url.accessCount} + 1`,
			})
			.where(eq(Schemas.url.shortUrl, shortUrl))
			.returning();

		if (response.length) {
			return makeSuccess(response[0]);
		}

		return makeError(new URLNotFoundError());
	} catch (error) {
		return makeError(new UnknownError());
	}
}
