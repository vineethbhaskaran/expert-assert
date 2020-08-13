import Section from "../types/Section";
import * as logger from "../logger/customLogger";
import { sectionModel } from "../schema/SectionSchema";
import CustomError from "../types/CustomError";

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
            const customError = new CustomError(400, "Section-Error-001", error.message);
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
            const customError = new CustomError(400, "section-Error-003", error.message);
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
            const customError = new CustomError(400, "sections-Error-001", error.message);
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
          const customError = new CustomError(400, "course-Error-002", error.message);
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
          const customError = new CustomError(400, "section-Error-004", error.message);
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
          const customError = new CustomError(400, "section-Error-004", error.message);
          reject(customError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }
}
