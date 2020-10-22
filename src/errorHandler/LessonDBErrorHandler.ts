import {
  LESSON_CREATION_ERROR,
  LESSON_DEFAULT_ERROR,
  LESSON_DELETION_ERROR,
  LESSON_NOT_FOUND_ERROR,
  LESSON_RETRIEVE_ERROR,
  LESSON_UPDATION_ERROR,
} from "../constants/errorConstants";
import {
  LESSON_OPERATION_CREATE,
  LESSON_OPERATION_GET,
  LESSON_OPERATION_UPDATE,
  LESSON_OPERATION_DELETE,
  STATUS_CODE_400,
} from "../constants/constants";
import CustomError from "../types/CustomError";
import { NO_DATA_FOUND } from "../constants/ErrorCodes";

export class LessonDBErrorHandler {
  static async handleErrors(errorCode: string, operationType: string): Promise<any> {
    switch (errorCode) {
      case NO_DATA_FOUND:
        const noDataFoundError = new CustomError(
          STATUS_CODE_400,
          LESSON_NOT_FOUND_ERROR.label,
          LESSON_NOT_FOUND_ERROR.details
        );
        return noDataFoundError;
      default:
        return this._getDefaultLessonErrors(operationType);
    }
  }

  private static async _getDefaultLessonErrors(operationType: string): Promise<any> {
    switch (operationType) {
      case LESSON_OPERATION_CREATE:
        const defaultCreationError = new CustomError(
          STATUS_CODE_400,
          LESSON_CREATION_ERROR.label,
          LESSON_CREATION_ERROR.details
        );
        return defaultCreationError;
      case LESSON_OPERATION_GET:
        const defaultGetError = new CustomError(
          STATUS_CODE_400,
          LESSON_RETRIEVE_ERROR.label,
          LESSON_RETRIEVE_ERROR.details
        );
        return defaultGetError;
      case LESSON_OPERATION_UPDATE:
        const defaultUpdateError = new CustomError(
          STATUS_CODE_400,
          LESSON_UPDATION_ERROR.label,
          LESSON_UPDATION_ERROR.details
        );
        return defaultUpdateError;
      case LESSON_OPERATION_DELETE:
        const defaultDeleteError = new CustomError(
          STATUS_CODE_400,
          LESSON_DELETION_ERROR.label,
          LESSON_DELETION_ERROR.details
        );
        return defaultDeleteError;

      default:
        const defaultCourseError = new CustomError(
          STATUS_CODE_400,
          LESSON_DEFAULT_ERROR.label,
          LESSON_DEFAULT_ERROR.details
        );
        return defaultCourseError;
    }
  }
}
