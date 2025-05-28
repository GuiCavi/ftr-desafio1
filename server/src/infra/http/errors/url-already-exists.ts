import { ErrorCodes, ErrorKeyCodes } from "./error-codes";

export class URLAlreadyExistsError extends Error {
  errorCode: ErrorCodes;
  errorKey: ErrorKeyCodes;

  constructor() {
    super("URL already exists");

    this.errorCode = ErrorCodes.URL_ALREADY_EXISTS;
    this.errorKey = ErrorKeyCodes.URL_ALREADY_EXISTS;
  }
}
