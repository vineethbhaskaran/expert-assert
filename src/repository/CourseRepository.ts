import Icourse from "../types/Icourse";
import courseSchema from "../schema/courseSchema";
import * as logger from "../logger/customLogger";
import { Error } from "mongoose";
import CustomError from "../types/CustomError";

export default class CourseRepository {
  /**
   * // TODO: make the call async and remove the hard coded values
   * This method save the course object to db collection using mongoose
   * save method
   * @param course
   */
  static async saveCourse(course: any): Promise<any> {
    const courseData = new courseSchema(course);
    return new Promise((resolve, reject) => {
      courseData.save((error, dbResponse) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(400, "course-Error-001", error.message);
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(dbResponse);
      });
    });
  }
}
