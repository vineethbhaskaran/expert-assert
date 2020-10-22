import * as logger from "../logger/customLogger";
import { STATUS_CODE_400 } from "../constants/constants";
import { COURSE_DETAILS_RETRIEVAL_ERROR, COURSE_DETAILS_UPDATION_ERROR } from "../constants/errorConstants";
import { userCourseDetailsModel } from "../schema/userCourseProgressSchema";
import CustomError from "../types/CustomError";
import UserCourseDetails from "../types/UserCourseDetails";

export default class UserCourseDetailsRepository {
  /**
   * Saves user course detail
   * @param userCourseDetails
   * @returns user course detail
   */
  static async saveUserCourseDetail(userCourseDetails: UserCourseDetails): Promise<any> {
    const userCourseDetailsData = new userCourseDetailsModel(userCourseDetails);
    return new Promise((resolve, reject) => {
      userCourseDetailsData.save((error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            COURSE_DETAILS_UPDATION_ERROR.label,
            COURSE_DETAILS_UPDATION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }

  /**
   * Updates user course detail
   * @param userCourseDetails
   * @returns user course detail
   */
  static async updateUserCourseDetail(userCourseDetails: UserCourseDetails): Promise<any> {
    return new Promise((resolve, reject) => {
      const filter = { courseId: userCourseDetails.courseId, userId: userCourseDetails.userId };
      userCourseDetailsModel.update(filter, userCourseDetails, (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            COURSE_DETAILS_UPDATION_ERROR.label,
            COURSE_DETAILS_UPDATION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(dbResponse);
      });
    });
  }

  /**
   * Gets user course detail by course id
   * @param courseId
   * @param userId
   * @returns user course detail by course id
   */
  static async getUserCourseDetailByCourseId(courseId: string, userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      userCourseDetailsModel
        .findOne()
        .select({ courseId: 1, currentSectionId: 1, currentLessonId: 1, userId: 1 })
        .where({ courseId: courseId, userId: userId })
        .exec((error: any, userCourseProgress: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              COURSE_DETAILS_RETRIEVAL_ERROR.label,
              COURSE_DETAILS_RETRIEVAL_ERROR.details
            );
            reject(customError);
          }
          resolve(userCourseProgress);
        });
    });
  }
}
