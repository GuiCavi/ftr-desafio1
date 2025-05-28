export enum ErrorCodes {
  URL_ALREADY_EXISTS = "BREV_1001",

  BAD_INPUT_FORMAT = "BREV_4000",
  INTERNAL_SERVER_ERROR = "BREV_5000",
}

export enum ErrorKeyCodes {
  URL_ALREADY_EXISTS = "url_already_exists",

  BAD_INPUT_FORMAT = "bad_input_format",
  INTERNAL_SERVER_ERROR = "internal_server_error",
}

// export type CustomError = {
//   code: ErrorCodes;
//   reason: ErrorKeyCodes;
// }