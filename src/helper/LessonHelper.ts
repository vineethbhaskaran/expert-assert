import CustomError from "../types/CustomError";
import LessonService from "../service/LessonService";
import Lesson from "../types/Lesson";
import { STATUS_CODE_400 } from "../constants/constants";
import { LESSON_SEQUENCE_DUPLICATE_ERROR } from "../constants/errorConstants";

export default class LessonHelper {
  static async validateLessonSeqence(lesson: Lesson): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const duplicateLessonSequence = await LessonService.getLessonsByCourseIdSectionIdLessonSequence(
        lesson.courseId,
        lesson.sectionId,
        lesson.lessonSequence
      );
      if (typeof duplicateLessonSequence === "undefined" || duplicateLessonSequence === null) {
        resolve(true);
        return;
      } else {
        //Dulicate exception
        const sectionSeqDuplicateError = new CustomError(
          STATUS_CODE_400,
          LESSON_SEQUENCE_DUPLICATE_ERROR.label,
          LESSON_SEQUENCE_DUPLICATE_ERROR.details
        );
        reject(sectionSeqDuplicateError);
        return;
      }
    });
  }
}
