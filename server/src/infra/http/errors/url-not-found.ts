import { ErrorCodes, ErrorKeyCodes } from "./error-codes";

export class URLNotFoundError extends Error {
	errorCode: ErrorCodes.URL_NOT_FOUND = ErrorCodes.URL_NOT_FOUND;
	errorKey: ErrorKeyCodes.URL_NOT_FOUND = ErrorKeyCodes.URL_NOT_FOUND;

	constructor() {
		super("URL does not exists");
	}
}
