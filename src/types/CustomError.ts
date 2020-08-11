export default class CustomError {
  status: number;
  errorCode: String;
  errorDetails: String;

  constructor(status: number, errorCode: String, errorDetails: String) {
    this.status = status;
    this.errorCode = errorCode;
    this.errorDetails = errorDetails;
  }
}
