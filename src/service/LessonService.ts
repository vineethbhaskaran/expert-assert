import LessonRepository from "../repository/LessonRepository";
import Lesson from "../types/Lesson";

export default class LessonService {
  static async getAllLessons(pageNo: number, pageSize: number, lessonCount: number): Promise<any> {
    return LessonRepository.getAllLessons(pageNo, pageSize, lessonCount);
  }

  static async getLessonCount(): Promise<any> {
    return LessonRepository.getLessonCount();
  }
  static async getLessonById(lessonId: string): Promise<any> {
    return LessonRepository.getLessonById(lessonId);
  }

  static async saveLesson(lesson: Lesson): Promise<any> {
    return LessonRepository.saveLesson(lesson);
  }

  static async updateLesson(lesson: Lesson): Promise<any> {
    return LessonRepository.updateLesson(lesson);
  }

  static async softDeleteLesson(lessonId: string): Promise<any> {
    return LessonRepository.softDeleteLesson(lessonId);
  }
}
