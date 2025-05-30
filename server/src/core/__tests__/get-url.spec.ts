import { randomUUID } from "node:crypto";
import type { URLTableModel } from "@/infra/db/schemas/url";
import { UnknownError } from "@/infra/http/errors/unknown-error";
import { URLNotFoundError } from "@/infra/http/errors/url-not-found";
import {
	type Error as EitherError,
	type Success,
	isError,
	isSuccess,
	unwrapEither,
} from "@/shared/either";
import { describe, expect, it } from "vitest";
import { getUrl } from "../get-url";
import { insertUrlRow } from "./helpers/test-helpers";

describe("get-url", () => {
	it("should return the URL if shortUrl exists", async () => {
		const randomName = `random-name-${randomUUID()}`;
		const url = "https://example.com";

		await insertUrlRow({
			url,
			shortUrl: randomName,
		});

		const sut = await getUrl({ shortUrl: randomName });

		expect(isSuccess(sut)).toBe(true);
		const result = unwrapEither(sut) as Success<URLTableModel>["right"];

		expect(result.shortUrl).toBe(randomName);
		expect(result.url).toBe(url);
	});

	it("should return URLNotFoundError if shortUrl does not exist", async () => {
		const randomName = `random-name-${randomUUID()}`;

		const sut = await getUrl({ shortUrl: randomName });

		expect(isError(sut)).toBe(true);

		const error = unwrapEither(sut) as EitherError<URLNotFoundError>["left"];
		expect(error).toBeInstanceOf(URLNotFoundError);
	});

	it("should return UnknownError if params are invalid", async () => {
		const sut = await getUrl({ shortUrl: "" });

		expect(isError(sut)).toBe(true);
		const error = unwrapEither(sut) as EitherError<UnknownError>["left"];
		expect(error).toBeInstanceOf(UnknownError);
	});
});
