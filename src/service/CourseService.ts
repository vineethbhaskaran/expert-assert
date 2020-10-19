import { CourseValidator } from "../validator/CourseValidator";
import CourseRepository from "../repository/CourseRepository";
import Course from "../types/Course";
import * as logger from "../logger/customLogger";

export default class CourseService {
  static async getAllCourses(pageNo: number, pageSize: number, courseCount: number): Promise<any> {
    return CourseRepository.getAllCourses(pageNo, pageSize, courseCount);
  }
  static async getCourseCount(): Promise<any> {
    return CourseRepository.getCourseCount();
  }
  static async getCourseById(courseId: string): Promise<any> {
    return CourseRepository.getCourseById(courseId);
  }
  static async saveCourse(course: Course): Promise<any> {
    //Set number of sections as 0 while creating the course
    course.numberOfSections = 0;

    const validateResult = await CourseValidator.validateCourse(course);
    return CourseRepository.saveCourse(course);
  }

  static async updateCourse(course: Course): Promise<any> {
    return CourseRepository.updateCourse(course);
  }

  static async softDeleteCourse(courseId: string): Promise<any> {
    return CourseRepository.softDeleteCourse(courseId);
  }
}
