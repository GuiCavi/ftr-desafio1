import { db } from "@/infra/db";
import { Schemas } from "@/infra/db/schemas";
import { UnknownError } from "@/infra/http/errors/unknown-error";
import { URLNotFoundError } from "@/infra/http/errors/url-not-found";
import { type Either, makeError, makeSuccess } from "@/shared/either";
import { UrlIdSchema } from "@/shared/validations/url-schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const DeleteUrlParams = z.object({
	id: UrlIdSchema,
});

type Params = z.infer<typeof DeleteUrlParams>;

export async function deleteUrl(
	params: Params,
): Promise<Either<UnknownError | URLNotFoundError, boolean>> {
	try {
		const { id } = DeleteUrlParams.parse(params);

		const response = await db
			.delete(Schemas.url)
			.where(eq(Schemas.url.id, id))
			.returning();

		if (response.length) {
			return makeSuccess(true);
		}

		return makeError(new URLNotFoundError());
	} catch (error) {
		return makeError(new UnknownError());
	}
}
