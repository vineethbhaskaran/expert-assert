import {
  SECTION_CREATION_ERROR,
  SECTION_DEFAULT_ERROR,
  SECTION_DELETION_ERROR,
  SECTION_RETRIEVE_ERROR,
  SECTION_UPDATION_ERROR,
} from "../constants/errorConstants";
import {
  SECTION_OPERATION_CREATE,
  SECTION_OPERATION_DELETE,
  SECTION_OPERATION_GET,
  SECTION_OPERATION_UPDATE,
  STATUS_CODE_400,
} from "../constants/constants";
import CustomError from "../types/CustomError";

export class SectionDBErrorHandler {
  static async handleErrors(errorCode: string, operationType: string): Promise<any> {
    switch (errorCode) {
      default:
        return this._getDefaultSectionErrors(operationType);
    }
  }

  private static async _getDefaultSectionErrors(operationType: string): Promise<any> {
    switch (operationType) {
      case SECTION_OPERATION_CREATE:
        const defaultCreationError = new CustomError(
          STATUS_CODE_400,
          SECTION_CREATION_ERROR.label,
          SECTION_CREATION_ERROR.details
        );
        return defaultCreationError;
      case SECTION_OPERATION_GET:
        const defaultGetError = new CustomError(
          STATUS_CODE_400,
          SECTION_RETRIEVE_ERROR.label,
          SECTION_RETRIEVE_ERROR.details
        );
        return defaultGetError;
      case SECTION_OPERATION_UPDATE:
        const defaultUpdateError = new CustomError(
          STATUS_CODE_400,
          SECTION_UPDATION_ERROR.label,
          SECTION_UPDATION_ERROR.details
        );
        return defaultUpdateError;
      case SECTION_OPERATION_DELETE:
        const defaultDeleteError = new CustomError(
          STATUS_CODE_400,
          SECTION_DELETION_ERROR.label,
          SECTION_DELETION_ERROR.details
        );
        return defaultDeleteError;

      default:
        const defaultCourseError = new CustomError(
          STATUS_CODE_400,
          SECTION_DEFAULT_ERROR.label,
          SECTION_DEFAULT_ERROR.details
        );
        return defaultCourseError;
    }
  }
}
