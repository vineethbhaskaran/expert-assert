import CourseRepository from "../repository/CourseRepository";

export default class CourseService {
  static async getAllCourses(): Promise<any> {
    return CourseRepository.getAllCourses();
  }
  static async saveCourse(course: any): Promise<any> {
    return CourseRepository.saveCourse(course);
  }
}
