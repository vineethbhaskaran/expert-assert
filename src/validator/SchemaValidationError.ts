export interface SchemaValidationError {
  validationErrorType: string;
  property: string;
  message: string;
  details: string;
  argument: String;
}
