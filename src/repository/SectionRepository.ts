import Section from "../types/Section";
import * as logger from "../logger/customLogger";
import { sectionModel } from "../schema/SectionSchema";
import CustomError from "../types/CustomError";
import { SECTION_COUNT_ERROR } from "../constants/errorConstants";
import {
  SECTION_OPERATION_CREATE,
  SECTION_OPERATION_DELETE,
  SECTION_OPERATION_GET,
  SECTION_OPERATION_UPDATE,
  STATUS_CODE_400,
} from "../constants/constants";
import { SectionDBErrorHandler } from "../errorHandler/SectionDBErrorHandler";

export default class SectionRepository {
  /**
   * Gets all sections
   * @param pageNo
   * @param pageSize
   * @param sectionCount
   * @returns all sections
   */
  static async getAllSections(pageNo: number, pageSize: number, sectionCount: number): Promise<any> {
    let offset = (pageNo - 1) * pageSize;
    return new Promise((resolve, reject) => {
      sectionModel
        .find()
        .select({ name: 1, sectionSequence: 1, numberOfLessons: 1, tenantId: 1, courseId: 1, isFinalSection: 1 })
        .where({ isActive: true })
        .skip(offset)
        .limit(pageSize)
        .sort({ sectionSequence: "asc" })
        .exec(async (error: any, sections: any) => {
          if (error) {
            logger.logMessage(error.message);
            const sectionRetrieveError = await SectionDBErrorHandler.handleErrors(error.code, SECTION_OPERATION_GET);
            reject(sectionRetrieveError);
          }
          resolve(sections);
        });
    });
  }

  /**
   * Gets section by id
   * @param sectionId
   * @returns section by id
   */
  static async getSectionById(sectionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      sectionModel
        .findOne()
        .select({ name: 1, sectionSequence: 1, numberOfLessons: 1, tenantId: 1, courseId: 1, isFinalSection: 1 })
        .where({ _id: sectionId, isActive: true })
        .exec(async (error: any, sections: any) => {
          if (error) {
            logger.logMessage(error.message);
            const sectionRetrieveError = await SectionDBErrorHandler.handleErrors(error.code, SECTION_OPERATION_GET);
            reject(sectionRetrieveError);
          }
          resolve(sections);
        });
    });
  }

  /**
   * Saves section
   * @param section
   * @returns section
   */
  static async saveSection(section: Section): Promise<any> {
    const sectionData = new sectionModel(section);
    return new Promise((resolve, reject) => {
      sectionData.save(async (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const sectionCreationError = await SectionDBErrorHandler.handleErrors(error.code, SECTION_OPERATION_CREATE);
          reject(sectionCreationError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }

  /**
   * Updates section
   * @param section
   * @returns section
   */
  static async updateSection(section: Section): Promise<any> {
    return new Promise((resolve, reject) => {
      const filter = { _id: section.id };
      sectionModel.update(filter, section, async (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const sectionUpdationError = await SectionDBErrorHandler.handleErrors(error.code, SECTION_OPERATION_UPDATE);
          reject(sectionUpdationError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(dbResponse);
      });
    });
  }

  /**
   * Softs delete section
   * @param sectionId
   * @returns delete section
   */
  static async softDeleteSection(sectionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const filter = { _id: sectionId };
      sectionModel.findOneAndUpdate(filter, { isActive: false }, async (error: any, dbResponse: any) => {
        if (error) {
          logger.logMessage(error.message);
          const sectionDeletionError = await SectionDBErrorHandler.handleErrors(error.code, SECTION_OPERATION_DELETE);
          reject(sectionDeletionError);
        }
        logger.logMessage("Respone from DB=" + JSON.stringify(dbResponse, null, 2));
        resolve(true);
      });
    });
  }
  /**
   * Gets sections by course
   * @param pageNo
   * @param pageSize
   * @param sectionCount
   * @param courseId
   * @returns sections by course
   */
  static async getSectionsByCourse(
    pageNo: number,
    pageSize: number,
    sectionCount: number,
    courseId: string
  ): Promise<any> {
    let offset = (pageNo - 1) * pageSize;
    return new Promise((resolve, reject) => {
      sectionModel
        .find()
        .select({ name: 1, sectionSequence: 1, numberOfLessons: 1, tenantId: 1, courseId: 1, isFinalSection: 1 })
        .where({ isActive: true, courseId: courseId })
        .skip(offset)
        .limit(pageSize)
        .sort({ sectionSequence: "asc" })
        .exec(async (error: any, sections: any) => {
          if (error) {
            logger.logMessage(error.message);
            const sectionRetrieveError = await SectionDBErrorHandler.handleErrors(error.code, SECTION_OPERATION_GET);
            reject(sectionRetrieveError);
          }
          resolve(sections);
        });
    });
  }

  /**
   * Gets section by course and sequence
   * @param courseId
   * @param sectionSequence
   * @returns section by course and position
   */
  static async getSectionByCourseAndPosition(courseId: string, sectionSequence: number): Promise<any> {
    return new Promise((resolve, reject) => {
      sectionModel
        .findOne()
        .select({ name: 1, sectionSequence: 1, numberOfLessons: 1, tenantId: 1, courseId: 1, isFinalSection: 1 })
        .where({ isActive: true, courseId: courseId, sectionSequence: sectionSequence })
        .sort({ sectionSequence: "asc" })
        .exec(async (error: any, sections: any) => {
          if (error) {
            logger.logMessage(error.message);
            const sectionRetrieveError = await SectionDBErrorHandler.handleErrors(error.code, SECTION_OPERATION_GET);
            reject(sectionRetrieveError);
          }
          resolve(sections);
        });
    });
  }

  /**
   * Gets section count
   * @returns section count
   */
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

  /**
   * Gets section count by course id
   * @param courseId
   * @returns section count by course id
   */
  static async getSectionCountByCourseId(courseId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      sectionModel
        .countDocuments()
        .where({ isActive: true, courseId: courseId })
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

  static async getLastSectionByCourse(courseId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      sectionModel
        .find()
        .select({ name: 1, sectionSequence: 1, numberOfLessons: 1, tenantId: 1, courseId: 1, isFinalSection: 1 })
        .where({ isActive: true, courseId: courseId })
        .limit(1)
        .sort({ sectionSequence: "desc" })
        .exec(async (error: any, sections: any) => {
          if (error) {
            logger.logMessage(error.message);
            const sectionRetrieveError = await SectionDBErrorHandler.handleErrors(error.code, SECTION_OPERATION_GET);
            reject(sectionRetrieveError);
          }
          //converting list to object
          let lastSection = sections[0];
          resolve(lastSection);
        });
    });
  }

  static async getNextSection(courseId: string, sectionSequence: number): Promise<any> {
    return new Promise((resolve, reject) => {
      sectionModel
        .find()
        .select({ name: 1, sectionSequence: 1, numberOfLessons: 1, tenantId: 1, courseId: 1, isFinalSection: 1 })
        .where({ isActive: true, courseId: courseId, sectionSequence: { $gt: sectionSequence } })
        .limit(1)
        .sort({ sectionSequence: "asc" })
        .exec(async (error: any, sections: any) => {
          if (error) {
            logger.logMessage(error.message);
            const sectionRetrieveError = await SectionDBErrorHandler.handleErrors(error.code, SECTION_OPERATION_GET);
            reject(sectionRetrieveError);
          }

          let nextSection = null;
          if (sections.length > 0) {
            nextSection = sections[0];
          }
          //converting list to object

          resolve(nextSection);
        });
    });
  }

  static async getPreviousSection(courseId: string, sectionSequence: number): Promise<any> {
    return new Promise((resolve, reject) => {
      sectionModel
        .find()
        .select({ name: 1, sectionSequence: 1, numberOfLessons: 1, tenantId: 1, courseId: 1, isFinalSection: 1 })
        .where({ isActive: true, courseId: courseId, sectionSequence: { $lt: sectionSequence } })
        .limit(1)
        .sort({ sectionSequence: "desc" })
        .exec(async (error: any, sections: any) => {
          if (error) {
            logger.logMessage(error.message);
            const sectionRetrieveError = await SectionDBErrorHandler.handleErrors(error.code, SECTION_OPERATION_GET);
            reject(sectionRetrieveError);
          }
          let prevSection = null;
          //converting list to object
          if (sections.length > 0) {
            prevSection = sections[0];
          }

          resolve(prevSection);
        });
    });
  }
}
