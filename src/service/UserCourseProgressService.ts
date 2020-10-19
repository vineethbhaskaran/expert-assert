import SectionRepository from "../repository/SectionRepository";
import LessonRepository from "../repository/LessonRepository";
import CourseRepository from "../repository/CourseRepository";
import UserCourseProgressRepository from "../repository/UserCourseProgressRepository";
import UserCourseProgress from "../types/UserCourseProgress";

const POSITION_ONE = 1;
const TEST_TENANT_ID = "testTenantId";
const TEST_USER_ID = "testUserId";

export default class UserCourseProgressService {
  static async loadfirstPage(courseId: string): Promise<any> {
    const userId = null;
    //@ts-ignore
    return this.loadNextPage(courseId, userId);
  }

  static async loadCurrentPage(userCourseProgress: UserCourseProgress): Promise<any> {
    //@ts-ignore
    let courseList = await CourseRepository.getCourseById(userCourseProgress.courseId);
    let courseName = courseList[0].name;
    //@ts-ignore
    let sectionList = await SectionRepository.getSectionById(userCourseProgress.currentSectionId);
    let sectionName = sectionList[0].name;
    //@ts-ignore
    let lessonList = await LessonRepository.getLessonById(userCourseProgress.currentLessonId);
    let lessonObject = lessonList[0];

    let currentPageContent = {
      lessonId: lessonObject._id,
      lessonName: lessonObject.name,
      lessonContents: lessonObject.contents,
      lessonSequence: lessonObject.sequence,
      courseId: userCourseProgress.courseId,
      sectionId: userCourseProgress.currentSectionId,
      courseName: courseName,
      sectionName: sectionName,
    };
    return new Promise((resolve, reject) => {
      resolve(currentPageContent);
    });
  }
  static async loadNextPage(courseId: string, userId: String): Promise<any> {
    if (typeof userId == "undefined" || userId == null) {
      userId = TEST_USER_ID;
    }
    //@ts-ignore
    let userCourseProgress = await UserCourseProgressRepository.getCourseProgressByCourseId(courseId, userId);

    if (typeof userCourseProgress == "undefined" || userCourseProgress == null) {
      let sectionData = await SectionRepository.getSectionByCourseAndPosition(courseId, POSITION_ONE);
      let lessonData = await LessonRepository.getLessonsByCourseIdSectionIdPosition(
        courseId,
        sectionData.id,
        POSITION_ONE
      );
      let newUserCourseProgress = {
        userId: TEST_USER_ID,
        tenantId: TEST_TENANT_ID,
        courseId: lessonData.courseId,
        currentSectionId: lessonData.sectionId,
        currentLessonId: lessonData._id,
      };
      //@ts-ignore
      let isSaved = await UserCourseProgressRepository.saveUserCourseProgress(newUserCourseProgress);
    } else {
      //@ts-ignore
      let sectionList = await SectionRepository.getSectionById(userCourseProgress.currentSectionId);
      let sectionObject = sectionList[0];
      //@ts-ignore
      let lessonList = await LessonRepository.getLessonById(userCourseProgress.currentLessonId);
      let lessonObject = lessonList[0];

      if (lessonObject.sequence < sectionObject.numberOfSessions) {
        let nextPosition = lessonObject.sequence + 1;
        let nextLesson = await LessonRepository.getLessonsByCourseIdSectionIdPosition(
          lessonObject.courseId,
          lessonObject.sectionId,
          nextPosition
        );
        userCourseProgress.currentLessonId = nextLesson._id;
        let isUpdated = await UserCourseProgressRepository.updateUserCourseProgress(userCourseProgress);
      } else {
        let nextSectionPosition = sectionObject.sectionNumber + 1;
        let nextSection = await SectionRepository.getSectionByCourseAndPosition(
          lessonObject.courseId,
          nextSectionPosition
        );
        let nextLesson = await LessonRepository.getLessonsByCourseIdSectionIdPosition(
          lessonObject.courseId,
          nextSection._id,
          POSITION_ONE
        );
        userCourseProgress.currentSectionId = nextLesson.sectionId;
        userCourseProgress.currentLessonId = nextLesson._id;
        let isUpdated = await UserCourseProgressRepository.updateUserCourseProgress(userCourseProgress);
      }
    }
    //@ts-ignore
    let updatedUserCourseProgress = await UserCourseProgressRepository.getCourseProgressByCourseId(courseId, userId);
    return this.loadCurrentPage(updatedUserCourseProgress);
  }
  static async loadPreviousPage(courseId: string): Promise<any> {}
}
