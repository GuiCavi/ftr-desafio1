import { db } from "@/infra/db";
import { Schemas } from "@/infra/db/schemas";

export async function insertUrlRow(data: { url: string; shortUrl: string }) {
	const result = await db
		.insert(Schemas.url)
		.values({
			url: data.url,
			shortUrl: data.shortUrl,
		})
		.returning();

	return result[0];
}
