import SectionRepository from "../repository/SectionRepository";
import LessonRepository from "../repository/LessonRepository";
import CourseRepository from "../repository/CourseRepository";

export default class UserCourseProgressService {
  static async loadfirstPage(courseId: string): Promise<any> {
    const POSITION_ONE = 1;
    let courseList = await CourseRepository.getCourseById(courseId);
    let courseName = courseList[0].name;
    let sectionData = await SectionRepository.getSectionByCourseAndPosition(courseId, POSITION_ONE);
    let lessonData = await LessonRepository.getLessonsByCourseIdSectionIdPosition(
      courseId,
      sectionData._id,
      POSITION_ONE
    );

    let attendCoursePage = {
      lessonId: lessonData._id,
      lessonName: lessonData.name,
      lessonContents: lessonData.contents,
      lessonSequence: lessonData.sequence,
      courseId: lessonData.courseId,
      sectionId: lessonData.sectionId,
      courseName: courseName,
      sectionName: sectionData.name,
    };
    return new Promise((resolve, reject) => {
      resolve(attendCoursePage);
    });
  }
}
