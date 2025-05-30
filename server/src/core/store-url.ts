import { db } from "@/infra/db";
import { Schemas } from "@/infra/db/schemas";
import type { URLTableModel } from "@/infra/db/schemas/url";
import { URLAlreadyExistsError } from "@/infra/http/errors/url-already-exists";
import { type Either, makeError, makeSuccess } from "@/shared/either";
import {
	ShortUrlValidationSchema,
	UrlValidationSchema,
} from "@/shared/validations/url-schema";
import { z } from "zod";

const StoreUrlParams = z.object({
	url: UrlValidationSchema,
	shortUrl: ShortUrlValidationSchema,
});

type Params = z.infer<typeof StoreUrlParams>;

export async function storeUrl(
	input: Params,
): Promise<Either<URLAlreadyExistsError, URLTableModel>> {
	const { url, shortUrl } = StoreUrlParams.parse(input);

	try {
		const response = await db
			.insert(Schemas.url)
			.values({
				url,
				shortUrl,
			})
			.returning();

		return makeSuccess(response[0]);
	} catch (error) {
		return makeError(new URLAlreadyExistsError());
	}
}
