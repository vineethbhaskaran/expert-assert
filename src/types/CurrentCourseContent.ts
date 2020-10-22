export class CurrentCourseContent {
  courseId: string;
  courseName: string;
  sectionId: string;
  sectionName: string;
  lessonId: string;
  lessonName: string;
  lessonSequence: number;
  contents?: string;
  isFinalLesson?: boolean;

  constructor(
    courseId: string,
    courseName: string,
    sectionId: string,
    sectionName: string,
    lessonId: string,
    lessonName: string,
    lessonSequence: number,
    contents: string,
    isFinalLesson: boolean
  ) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.sectionId = sectionId;
    this.sectionName = sectionName;
    this.lessonId = lessonId;
    this.lessonName = lessonName;
    this.lessonSequence = lessonSequence;
    this.contents = contents;
    this.isFinalLesson = isFinalLesson;
  }
}
