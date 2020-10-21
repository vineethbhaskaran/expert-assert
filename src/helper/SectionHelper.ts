import { STATUS_CODE_400 } from "../constants/constants";
import CustomError from "../types/CustomError";
import SectionService from "../service/SectionService";
import Section from "../types/Section";
import { SECTION_SEQUENCE_DUPLICATE_ERROR } from "../constants/errorConstants";
import { resolveModuleName } from "typescript";

export default class SectionHelper {
  /**
   * Validates section seqence:
   * This method checks whether the sequence already exists fot he course.
   * If present it will reject with throw duplicate exception
   * else it will proceed further
   * @param section
   * @returns section seqence
   */
  static async validateSectionSeqence(section: Section): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const duplicateSequeceDoc = await SectionService.getSectionByCourseAndSectionSequence(
        section.courseId,
        section.sectionSequence
      );
      if (typeof duplicateSequeceDoc === "undefined" || duplicateSequeceDoc === null) {
        //The section sequence is unique, can proceed to save record
        resolve(true);
      } else {
        //Dulicate exception
        const sectionSeqDuplicateError = new CustomError(
          STATUS_CODE_400,
          SECTION_SEQUENCE_DUPLICATE_ERROR.label,
          SECTION_SEQUENCE_DUPLICATE_ERROR.details
        );
        reject(sectionSeqDuplicateError);
        return;
      }
    });
  }
}
