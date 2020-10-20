import { courseModel } from "../schema/courseSchema";
import * as logger from "../logger/customLogger";
import CustomError from "../types/CustomError";
import Course from "../types/Course";
import {
  COURSE_CREATION_ERROR,
  COURSE_RETRIEVE_ALL_ERROR,
  COURSE_RETRIEVE_BY_ID_ERROR,
  COURSE_COUNT_ERROR,
  COURSE_UPDATION_ERROR,
  COURSE_DELETION_ERROR,
} from "../constants/errorConstants";
import { STATUS_CODE_400 } from "../constants/constants";
import { CourseDBErrorHandler } from "../errorHandler/CourseDBErrorHandler";

export default class CourseRepository {
  static async getAllCourses(pageNo: number, pageSize: number, courseCount: number): Promise<any> {
    let offset = (pageNo - 1) * pageSize;
    return new Promise((resolve, reject) => {
      courseModel
        .find()
        .select({ code: 1, name: 1, description: 1, tenantId: 1, isPublished: 1 })
        .where({ isActive: true })
        .skip(offset)
        .limit(pageSize)
        .sort({ name: "asc" })
        .exec((error: any, courses: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              COURSE_RETRIEVE_ALL_ERROR.label,
              COURSE_RETRIEVE_ALL_ERROR.details
            );
            reject(customError);
            return;
          }
          resolve(courses);
        });
    });
  }

  static async getCourseCount(): Promise<any> {
    return new Promise((resolve, reject) => {
      courseModel
        .countDocuments()
        .where({ isActive: true })
        .exec((error: any, count: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(STATUS_CODE_400, COURSE_COUNT_ERROR.label, COURSE_COUNT_ERROR.details);
            reject(customError);
          }
          resolve(count);
        });
    });
  }

  static async getCourseById(courseId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      courseModel
        .findOne()
        .select({ code: 1, name: 1, description: 1, tenantId: 1, isPublished: 1 })
        .where({ _id: courseId, isActive: true })
        .exec((error: any, courses: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              COURSE_RETRIEVE_BY_ID_ERROR.label,
              COURSE_RETRIEVE_BY_ID_ERROR.details
            );
            reject(customError);
            return;
          }
          resolve(courses);
        });
    });
  }

  /**
   * // TODO: make the call async and remove the hard coded values
   * This method save the course object to db collection using mongoose
   * save method
   * @param course
   */
  static async saveCourse(course: Course): Promise<any> {
    const courseData = new courseModel(course);
    return new Promise((resolve, reject) => {
      courseData.save(async (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const courseCreationError = await CourseDBErrorHandler.handleErrors(error.code);
          reject(courseCreationError);
          return;
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }

  static async updateCourse(course: Course): Promise<any> {
    return new Promise((resolve, reject) => {
      const filter = { _id: course.id };
      courseModel.update(filter, course, (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            COURSE_UPDATION_ERROR.label,
            COURSE_UPDATION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(dbResponse);
      });
    });
  }

  static async softDeleteCourse(courseId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const filter = { _id: courseId };
      courseModel.findOneAndUpdate(filter, { isActive: false }, (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            COURSE_DELETION_ERROR.label,
            COURSE_DELETION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }
}
