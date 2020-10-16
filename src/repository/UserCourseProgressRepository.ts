import * as logger from "../logger/customLogger";
import { STATUS_CODE_400 } from "../constants/constants";
import { COURSE_PROGRESS_RETRIEVAL_ERROR, COURSE_PROGRESS_UPDATION_ERROR } from "../constants/errorConstants";
import { userCourseProgressModel } from "../schema/userCourseProgressSchema";
import CustomError from "../types/CustomError";
import UserCourseProgress from "../types/UserCourseProgress";

export default class UserCourseProgressRepository {
  static async saveUserCourseProgress(userCourseProgress: UserCourseProgress): Promise<any> {
    const userCourseProgressData = new userCourseProgressModel(userCourseProgress);
    return new Promise((resolve, reject) => {
      userCourseProgressData.save((error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            COURSE_PROGRESS_UPDATION_ERROR.label,
            COURSE_PROGRESS_UPDATION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }

  static async updateUserCourseProgress(userCourseProgress: UserCourseProgress): Promise<any> {
    return new Promise((resolve, reject) => {
      const filter = { _id: userCourseProgress.id };
      userCourseProgressModel.update(filter, userCourseProgress, (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            COURSE_PROGRESS_UPDATION_ERROR.label,
            COURSE_PROGRESS_UPDATION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(dbResponse);
      });
    });
  }

  static async getCourseProgressByCourseId(courseId: string, userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      userCourseProgressModel
        .findOne()
        .select({ courseId: 1, currentSectionId: 1, currentLessonId: 1, userId: 1 })
        .where({ courseId: courseId, userId: userId })
        .exec((error: any, userCourseProgress: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              COURSE_PROGRESS_RETRIEVAL_ERROR.label,
              COURSE_PROGRESS_RETRIEVAL_ERROR.details
            );
            reject(customError);
          }
          resolve(userCourseProgress);
        });
    });
  }
}
