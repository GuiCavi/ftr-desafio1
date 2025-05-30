import { ErrorCodes, ErrorKeyCodes } from "./error-codes";

export class UnknownError extends Error {
  errorCode: ErrorCodes.UNKNOWN_ERROR = ErrorCodes.UNKNOWN_ERROR;
  errorKey: ErrorKeyCodes.UNKNOWN_ERROR = ErrorKeyCodes.UNKNOWN_ERROR;

  constructor() {
    super("Unknown error");
  }
}
