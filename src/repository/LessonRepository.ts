import { lessonModel } from "../schema/lessonSchema";
import CustomError from "../types/CustomError";
import * as logger from "../logger/customLogger";
import Lesson from "../types/Lesson";
import {
  LESSON_CREATION_ERROR,
  LESSON_RETRIEVE_ALL_ERROR,
  LESSON_RETRIEVE_BY_ID_ERROR,
  LESSON_COUNT_ERROR,
  LESSON_UPDATION_ERROR,
  LESSON_DELETION_ERROR,
} from "../constants/errorConstants";
import { STATUS_CODE_400 } from "../constants/constants";

export default class LessonRepository {
  static async getAllLessons(pageNo: number, pageSize: number, lessonCount: number): Promise<any> {
    let offset = (pageNo - 1) * pageSize;
    return new Promise((resolve, reject) => {
      lessonModel
        .find()
        .select({ name: 1, sequence: 1, contents: 1, courseId: 1, sectionId: 1 })
        .where({ isActive: true })
        .skip(offset)
        .limit(pageSize)
        .sort({ sequence: "asc" })
        .exec((error: any, lessons: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              LESSON_RETRIEVE_ALL_ERROR.label,
              LESSON_RETRIEVE_ALL_ERROR.details
            );
            reject(customError);
          }
          resolve(lessons);
        });
    });
  }

  static async getLessonsByCourseIdSectionId(
    pageNo: number,
    pageSize: number,
    lessonCount: number,
    courseId: string,
    sectionId: string
  ): Promise<any> {
    let offset = (pageNo - 1) * pageSize;
    return new Promise((resolve, reject) => {
      lessonModel
        .find()
        .select({ name: 1, sequence: 1, contents: 1, courseId: 1, sectionId: 1 })
        .where({ isActive: true, courseId: courseId, sectionId: sectionId })
        .skip(offset)
        .limit(pageSize)
        .sort({ sequence: "asc" })
        .exec((error: any, lessons: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              LESSON_RETRIEVE_ALL_ERROR.label,
              LESSON_RETRIEVE_ALL_ERROR.details
            );
            reject(customError);
          }
          resolve(lessons);
        });
    });
  }
  
  static async getLessonCount(): Promise<any> {
    return new Promise((resolve, reject) => {
      lessonModel
        .countDocuments()
        .where({ isActive: true })
        .exec((error: any, count: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(STATUS_CODE_400, LESSON_COUNT_ERROR.label, LESSON_COUNT_ERROR.details);
            reject(customError);
          }
          resolve(count);
        });
    });
  }
  
  static async getLessonCountByCourseIdSectionId(courseId: string, sectionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      lessonModel
        .countDocuments()
        .where({ isActive: true, courseId: courseId, sectionId: sectionId })
        .exec((error: any, count: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(STATUS_CODE_400, LESSON_COUNT_ERROR.label, LESSON_COUNT_ERROR.details);
            reject(customError);
          }
          resolve(count);
        });
    });
  }

  

  static async getLessonById(lessonId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      lessonModel
        .find()
        .select({ name: 1, sequence: 1, contents: 1, courseId: 1, sectionId: 1 })
        .where({ _id: lessonId, isActive: true })
        .exec((error: any, lessons: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              LESSON_RETRIEVE_BY_ID_ERROR.label,
              LESSON_RETRIEVE_BY_ID_ERROR.details
            );
            reject(customError);
          }
          resolve(lessons);
        });
    });
  }

  static async saveLesson(lesson: Lesson): Promise<any> {
    const lessonData = new lessonModel(lesson);
    return new Promise((resolve, reject) => {
      lessonData.save((error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            LESSON_CREATION_ERROR.label,
            LESSON_CREATION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }

  static async updateLesson(lesson: Lesson): Promise<any> {
    return new Promise((resolve, reject) => {
      const filter = { _id: lesson.id };
      lessonModel.update(filter, lesson, (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            LESSON_UPDATION_ERROR.label,
            LESSON_UPDATION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(dbResponse);
      });
    });
  }
  static async softDeleteLesson(lessonId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const filter = { _id: lessonId };
      lessonModel.findOneAndUpdate(filter, { isActive: false }, (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            LESSON_DELETION_ERROR.label,
            LESSON_DELETION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }
}
