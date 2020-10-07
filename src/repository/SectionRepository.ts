import Section from "../types/Section";
import * as logger from "../logger/customLogger";
import { sectionModel } from "../schema/SectionSchema";
import CustomError from "../types/CustomError";
import {
  SECTION_CREATION_ERROR,
  SECTION_RETRIEVE_ALL_ERROR,
  SECTION_RETRIEVE_BY_ID_ERROR,
  SECTION_COUNT_ERROR,
  SECTION_UPDATION_ERROR,
  SECTION_DELETION_ERROR,
} from "../constants/errorConstants";
import { STATUS_CODE_400 } from "../constants/constants";

export default class SectionRepository {
  static async getAllSections(pageNo: number, pageSize: number, sectionCount: number): Promise<any> {
    let offset = (pageNo - 1) * pageSize;
    return new Promise((resolve, reject) => {
      sectionModel
        .find()
        .select({ name: 1, sectionNumber: 1, numberOfSessions: 1 })
        .where({ isActive: true })
        .skip(offset)
        .limit(pageSize)
        .sort({ name: "asc" })
        .exec((error: any, sections: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              SECTION_RETRIEVE_ALL_ERROR.label,
              SECTION_RETRIEVE_ALL_ERROR.details
            );
            reject(customError);
          }
          resolve(sections);
        });
    });
  }

  static async getSectionsByCourse(pageNo: number, pageSize: number, sectionCount: number,courseId: string): Promise<any> {
    let offset = (pageNo - 1) * pageSize;
    return new Promise((resolve, reject) => {
      sectionModel
        .find()
        .select({ name: 1, sectionNumber: 1, numberOfSessions: 1,course:1 })
        .where({ isActive: true,course: courseId})
        .skip(offset)
        .limit(pageSize)
        .sort({ name: "asc" })
        .exec((error: any, sections: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              SECTION_RETRIEVE_ALL_ERROR.label,
              SECTION_RETRIEVE_ALL_ERROR.details
            );
            reject(customError);
          }
          resolve(sections);
        });
    });
  }

  static async getSectionCount(): Promise<any> {
    return new Promise((resolve, reject) => {
      sectionModel
        .countDocuments()
        .where({ isActive: true })
        .exec((error: any, count: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              SECTION_COUNT_ERROR.label,
              SECTION_COUNT_ERROR.details
            );
            reject(customError);
          }
          resolve(count);
        });
    });
  }

  static async getSectionCountByCourseId(courseId:string): Promise<any> {
    return new Promise((resolve, reject) => {
      sectionModel
        .countDocuments()
        .where({ isActive: true,course: courseId})
        .exec((error: any, count: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              SECTION_COUNT_ERROR.label,
              SECTION_COUNT_ERROR.details
            );
            reject(customError);
          }
          resolve(count);
        });
    });
  }

  static async getSectionById(sectionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      sectionModel
        .find()
        .select({ name: 1, sectionNumber: 1, numberOfSessions: 1 })
        .where({ _id: sectionId, isActive: true })
        .exec((error: any, sections: any) => {
          if (error) {
            logger.logMessage(error.message);
            const customError = new CustomError(
              STATUS_CODE_400,
              SECTION_RETRIEVE_BY_ID_ERROR.label,
              SECTION_RETRIEVE_BY_ID_ERROR.details
            );
            reject(customError);
          }
          resolve(sections);
        });
    });
  }
  static async saveSection(section: Section): Promise<any> {
    const sectionData = new sectionModel(section);
    return new Promise((resolve, reject) => {
      sectionData.save((error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            SECTION_CREATION_ERROR.label,
            SECTION_CREATION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }
  static async updateSection(section: Section): Promise<any> {
    return new Promise((resolve, reject) => {
      const filter = { _id: section.id };
      sectionModel.update(filter, section, (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            SECTION_UPDATION_ERROR.label,
            SECTION_UPDATION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(dbResponse);
      });
    });
  }

  static async softDeleteSection(sectionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const filter = { _id: sectionId };
      sectionModel.findOneAndUpdate(filter, { isActive: false }, (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const customError = new CustomError(
            STATUS_CODE_400,
            SECTION_DELETION_ERROR.label,
            SECTION_DELETION_ERROR.details
          );
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }
}
