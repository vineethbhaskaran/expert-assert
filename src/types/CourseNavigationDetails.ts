export class CourseNavigationDetails {
  courseId: string;
  sectionId: string;
  lessonId: string;
  lessonName: String;
  constructor(courseId: string, sectionId: string, lessonId: string, lessonName: String) {
    this.courseId = courseId;
    this.sectionId = sectionId;
    this.lessonId = lessonId;
    this.lessonName = lessonName;
  }
}
