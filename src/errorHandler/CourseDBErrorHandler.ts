import {
  COURSE_OPERATION_CREATE,
  COURSE_OPERATION_DELETE,
  COURSE_OPERATION_GET,
  COURSE_OPERATION_UPDATE,
  STATUS_CODE_400,
} from "../constants/constants";
import {
  COURSE_CODE_DUPLICATE,
  COURSE_CREATION_ERROR,
  COURSE_DEFAULT_ERROR,
  COURSE_DELETION_ERROR,
  COURSE_RETRIEVE_ERROR,
  COURSE_UPDATION_ERROR,
} from "../constants/errorConstants";
import { MONGO_DUPLICATE_KEY_ERROR } from "../constants/MongoErrorCodes";
import CustomError from "../types/CustomError";

export class CourseDBErrorHandler {
  /**
   * Handles errors for different mongodb error codes
   * @param mongoErrorCode
   * @param operationType
   * @returns errors
   */
  static async handleErrors(mongoErrorCode: number, operationType: string): Promise<any> {
    switch (mongoErrorCode) {
      case MONGO_DUPLICATE_KEY_ERROR:
        const duplicateError = new CustomError(
          STATUS_CODE_400,
          COURSE_CODE_DUPLICATE.label,
          COURSE_CODE_DUPLICATE.details
        );
        return duplicateError;
      default:
        return this._getDefaultCourseErrors(operationType);
    }
  }
  /**
   * Get default errors for different course operations
   * @param operationType
   * @returns default course errors
   */
  private static async _getDefaultCourseErrors(operationType: string): Promise<any> {
    switch (operationType) {
      case COURSE_OPERATION_CREATE:
        const defaultCreationError = new CustomError(
          STATUS_CODE_400,
          COURSE_CREATION_ERROR.label,
          COURSE_CREATION_ERROR.details
        );
        return defaultCreationError;
      case COURSE_OPERATION_GET:
        const defaultGetError = new CustomError(
          STATUS_CODE_400,
          COURSE_RETRIEVE_ERROR.label,
          COURSE_RETRIEVE_ERROR.details
        );
        return defaultGetError;
      case COURSE_OPERATION_UPDATE:
        const defaultUpdateError = new CustomError(
          STATUS_CODE_400,
          COURSE_UPDATION_ERROR.label,
          COURSE_UPDATION_ERROR.details
        );
        return defaultUpdateError;
      case COURSE_OPERATION_DELETE:
        const defaultDeleteError = new CustomError(
          STATUS_CODE_400,
          COURSE_DELETION_ERROR.label,
          COURSE_DELETION_ERROR.details
        );
        return defaultDeleteError;

      default:
        const defaultCourseError = new CustomError(
          STATUS_CODE_400,
          COURSE_DEFAULT_ERROR.label,
          COURSE_DEFAULT_ERROR.details
        );
        return defaultCourseError;
    }
  }
}
