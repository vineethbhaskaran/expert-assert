import CourseRepository from "../repository/CourseRepository";
import Icourse from "../types/Icourse";

export default class CourseService {
  static async getAllCourses(pageNo: number, pageSize: number, courseCount: number): Promise<any> {
    return CourseRepository.getAllCourses(pageNo, pageSize, courseCount);
  }
  static async getCourseCount(): Promise<any> {
    return CourseRepository.getCourseCount();
  }
  static async saveCourse(course: any): Promise<any> {
    return CourseRepository.saveCourse(course);
  }
}
