export class CourseNavigationDetails {
  courseId: string;
  sectionId: string;
  lessonId: string;
  constructor(courseId: string, sectionId: string, lessonId: string) {
    this.courseId = courseId;
    this.sectionId = sectionId;
    this.lessonId = lessonId;
  }
}
