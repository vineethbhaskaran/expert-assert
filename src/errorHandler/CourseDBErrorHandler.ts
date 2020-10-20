import { STATUS_CODE_400 } from "../constants/constants";
import { COURSE_CODE_DUPLICATE, COURSE_CREATION_ERROR } from "../constants/errorConstants";
import { MONGO_DUPLICATE_KEY_ERROR } from "../constants/MongoErrorCodes";
import CustomError from "../types/CustomError";

export class CourseDBErrorHandler {
  static async handleErrors(mongoErrorCode: number): Promise<any> {
    switch (mongoErrorCode) {
      case MONGO_DUPLICATE_KEY_ERROR:
        const duplicateError = new CustomError(
          STATUS_CODE_400,
          COURSE_CODE_DUPLICATE.label,
          COURSE_CODE_DUPLICATE.details
        );
        return duplicateError;
      default:
        const customError = new CustomError(
          STATUS_CODE_400,
          COURSE_CREATION_ERROR.label,
          COURSE_CREATION_ERROR.details
        );
    }
  }
}
