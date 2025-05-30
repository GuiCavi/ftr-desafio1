import { z } from "zod";

export const UrlIdSchema = z.string().uuid();

export const UrlValidationSchema = z.string().url();

export const ShortUrlValidationSchema = z
	.string()
	.min(1)
	.max(100)
	.regex(/^[a-zA-Z0-9\-._]+$/, "Invalid characters in URL segment");
