import { ErrorCodes, ErrorKeyCodes } from "./error-codes";

export class URLAlreadyExistsError extends Error {
  errorCode: ErrorCodes.URL_ALREADY_EXISTS = ErrorCodes.URL_ALREADY_EXISTS;
  errorKey: ErrorKeyCodes.URL_ALREADY_EXISTS = ErrorKeyCodes.URL_ALREADY_EXISTS;

  constructor() {
    super("URL already exists");
  }
}
