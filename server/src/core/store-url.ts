import { db } from "@/infra/db";
import { Schemas } from "@/infra/db/schemas";
import { URLTableModel } from "@/infra/db/schemas/url";
import { URLAlreadyExistsError } from "@/infra/http/errors/url-already-exists";
import { makeSuccess, makeError, Either } from "@/shared/either";
import { z } from "zod";

const StoreUrlParams = z.object({
  url: z.string().url(),
  shortUrl: z.string().regex(
    /^[a-zA-Z0-9\-._]+$/,
    "Invalid characters in URL segment"
  ),
});

type Params = z.infer<typeof StoreUrlParams>;

export async function storeUrl(input: Params): Promise<Either<URLAlreadyExistsError, URLTableModel>> {
  const {
    url,
    shortUrl,
  } = StoreUrlParams.parse(input);

  try {
    const response = await db
      .insert(Schemas.url)
      .values({
        url,
        shortUrl,
      }).returning();

    return makeSuccess(response[0]);
  } catch (error) {
    return makeError(new URLAlreadyExistsError());
  }
}