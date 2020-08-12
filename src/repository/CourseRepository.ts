import { courseModel } from "../schema/courseSchema";
import * as logger from "../logger/customLogger";
import CustomError from "../types/CustomError";

export default class CourseRepository {
  static async getAllCourses(pageNo: number, pageSize: number, courseCount: number): Promise<any> {
    let offset = (pageNo - 1) * pageSize;
    return new Promise((resolve, reject) => {
      courseModel
        .find()
        .select({ code: 1, name: 1, description: 1 })
        .where({ isActive: true })
        .skip(offset)
        .limit(pageSize)
        .sort({ code: "asc" })
        .exec((error, courses) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(400, "course-Error-001", error.message);
            reject(customError);
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
        .exec((error, count) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(400, "course-Error-003", error.message);
            reject(customError);
          }
          resolve(count);
        });
    });
  }

  /**
   * // TODO: make the call async and remove the hard coded values
   * This method save the course object to db collection using mongoose
   * save method
   * @param course
   */
  static async saveCourse(course: any): Promise<any> {
    const courseData = new courseModel(course);
    return new Promise((resolve, reject) => {
      courseData.save((error, dbResponse) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(400, "course-Error-002", error.message);
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(dbResponse);
      });
    });
  }
}
