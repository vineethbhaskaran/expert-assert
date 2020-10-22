import { LessonValidator } from "../validator/LessonValidator";
import LessonRepository from "../repository/LessonRepository";
import Lesson from "../types/Lesson";

export default class LessonService {
  static async getAllLessons(pageNo: number, pageSize: number, lessonCount: number): Promise<any> {
    return LessonRepository.getAllLessons(pageNo, pageSize, lessonCount);
  }

  static async getLessonsByCourseIdSectionId(
    pageNo: number,
    pageSize: number,
    lessonCount: number,
    courseId: string,
    sectionId: string
  ): Promise<any> {
    return LessonRepository.getLessonsByCourseIdSectionId(pageNo, pageSize, lessonCount, courseId, sectionId);
  }

  static async getLessonCount(): Promise<any> {
    return LessonRepository.getLessonCount();
  }
  static async getLessonCountByCourseIdSectionId(courseId: string, sectionId: string): Promise<any> {
    return LessonRepository.getLessonCountByCourseIdSectionId(courseId, sectionId);
  }
  static async getLessonById(lessonId: string): Promise<any> {
    return LessonRepository.getLessonById(lessonId);
  }

  static async saveLesson(lesson: Lesson): Promise<any> {
    const validateResult = await LessonValidator.validateLesson(lesson);
    return LessonRepository.saveLesson(lesson);
  }

  static async updateLesson(lesson: Lesson): Promise<any> {
    return LessonRepository.updateLesson(lesson);
  }

  static async softDeleteLesson(lessonId: string): Promise<any> {
    return LessonRepository.softDeleteLesson(lessonId);
  }
  static async getLessonsByCourseIdSectionIdLessonSequence(
    courseId: string,
    sectionId: string,
    lessonsequence: number
  ): Promise<any> {
    return LessonRepository.getLessonsByCourseIdSectionIdPosition(courseId, sectionId, lessonsequence);
  }
  static async getLastLessonByCourseIdSectionId(courseId: string, sectionId: string): Promise<any> {
    return LessonRepository.getLastLessonByCourseIdSectionId(courseId, sectionId);
  }

  static async getNextLessonByCourseIdSectionId(
    courseId: string,
    sectionId: string,
    lessonSequence: number
  ): Promise<any> {
    return LessonRepository.getNextLessonByCourseIdSectionId(courseId, sectionId, lessonSequence);
  }

  static async getPrevoiusLessonByCourseIdSectionId(
    courseId: string,
    sectionId: string,
    lessonSequence: number
  ): Promise<any> {
    return LessonRepository.getPrevoiusLessonByCourseIdSectionId(courseId, sectionId, lessonSequence);
  }
}
