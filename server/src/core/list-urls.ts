import { db } from "@/infra/db";
import { Schemas } from "@/infra/db/schemas";
import type { URLTableModel } from "@/infra/db/schemas/url";
import { UnknownError } from "@/infra/http/errors/unknown-error";
import { type Either, makeError, makeSuccess } from "@/shared/either";
import { z } from "zod";

const ListUrlsParams = z.undefined();

type Params = z.infer<typeof ListUrlsParams>;

export async function listUrls(): Promise<
	Either<UnknownError, URLTableModel[]>
> {
	try {
		const response = await db.select().from(Schemas.url);

		return makeSuccess(response);
	} catch (error) {
		return makeError(new UnknownError());
	}
}
