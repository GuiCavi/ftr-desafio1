import { z } from "zod";
import type { ErrorCodes, ErrorKeyCodes } from "../../errors/error-codes";

export const errorResponseSchema = (
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
