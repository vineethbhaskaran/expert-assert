import SectionRepository from "../repository/SectionRepository";
import LessonRepository from "../repository/LessonRepository";
import CourseRepository from "../repository/CourseRepository";
import UserCourseDetailsRepository from "../repository/UserCourseDetailsRepository";
import UserCourseDetails from "../types/UserCourseDetails";
import { CourseNavigationDetails } from "../types/CourseNavigationDetails";
import SectionService from "./SectionService";
import LessonService from "./LessonService";
import { SEQUENCE_ONE } from "../constants/constants";
import Lesson from "../types/Lesson";
import Section from "../types/Section";

const TEST_TENANT_ID = "testTenantId";

export default class UserCourseDetailsService {
  /**
   * Gets current page details:
   * If UserCourseDetails entry is present use that courseId,sectionId,lessonId
   * Otherwise use the first section and lesson
   * @param courseId
   * @param userId
   * @returns current page details
   */
  static async getCurrentPageDetails(courseId: string, userId: string): Promise<any> {
    let userCourseDetails = await UserCourseDetailsRepository.getUserCourseDetailByCourseId(courseId, userId);
    return new Promise(async (resolve, reject) => {
      if (typeof userCourseDetails !== "undefined" && userCourseDetails !== null) {
        //First record for course
        const courseId = userCourseDetails.courseId;
        const sectionId = userCourseDetails.currentSectionId;
        const lessonId = userCourseDetails.currentLessonId;
        let courseNavigationDetails = new CourseNavigationDetails(courseId, sectionId, lessonId);
        resolve(courseNavigationDetails);
      } else {
        //get first section:with seqence 1
        const section = await SectionService.getSectionByCourseAndSectionSequence(courseId, SEQUENCE_ONE);
        //get first lesson:with seqence 1
        const lesson = await LessonService.getLessonsByCourseIdSectionIdLessonSequence(
          courseId,
          section.id,
          SEQUENCE_ONE
        );

        let newUserCourseProgress = {
          userId: userId,
          tenantId: TEST_TENANT_ID,
          courseId: courseId,
          currentSectionId: section.id,
          currentLessonId: lesson.id,
        };

        //@ts-ignore
        let isSaved = await UserCourseDetailsRepository.saveUserCourseDetail(newUserCourseProgress);

        let courseNavigationDetails = new CourseNavigationDetails(courseId, section.id, lesson.id);

        resolve(courseNavigationDetails);
      }
    });
  }

  static async getNextPageDetails(courseId: string, sectionId: string, lessonId: string, userId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let lesson = <Lesson>await LessonService.getLessonById(lessonId);

      if (lesson.isFinalLesson === false) {
        let nextLesson = <Lesson>(
          await LessonService.getNextLessonByCourseIdSectionId(lesson.courseId, lesson.sectionId, lesson.lessonSequence)
        );
        //updating userCourseDetail table
        await UserCourseDetailsService._updateUserCourseDetails(userId, nextLesson);
        //send details to redirect to display age content
        let courseNavigationDetails = UserCourseDetailsService._createCourseNavigationDetails(nextLesson);
        resolve(courseNavigationDetails);
      } else {
        let currentSection = <Section>await SectionService.getSectionById(sectionId);
        if (currentSection.isFinalSection === true) {
          //TODO:End of the course
        } else {
          let nextSection = <Section>(
            await SectionService.getNextSection(currentSection.courseId, currentSection.sectionSequence)
          );
          //first lesson of next section
          let nextLesson = await LessonService.getLessonsByCourseIdSectionIdLessonSequence(
            nextSection.courseId,
            nextSection.id,
            SEQUENCE_ONE
          );

          //updating userCourseDetail table
          await UserCourseDetailsService._updateUserCourseDetails(userId, nextLesson);
          //send details to redirect to display age content
          let courseNavigationDetails = UserCourseDetailsService._createCourseNavigationDetails(nextLesson);
          resolve(courseNavigationDetails);
        }
      }
    });
  }
  /**
   * Updates user course details
   * @param userId
   * @param nextLesson
   */
  private static async _updateUserCourseDetails(userId: string, nextLesson: Lesson) {
    let userCourseDetail = {
      userId: userId,
      tenantId: TEST_TENANT_ID,
      courseId: nextLesson.courseId,
      currentSectionId: nextLesson.sectionId,
      currentLessonId: nextLesson.id,
    };
    //@ts-ignore
    let isUpdated = await UserCourseDetailsRepository.updateUserCourseDetail(userCourseDetail);
  }
  /**
   * Creates course navigation details
   * @param nextLesson
   * @returns
   */
  private static _createCourseNavigationDetails(nextLesson: Lesson) {
    return new CourseNavigationDetails(nextLesson.courseId, nextLesson.sectionId, nextLesson.id);
  }

  /*
  // =========  OLD =========
  static async loadfirstPage(courseId: string): Promise<any> {
    const userId = null;
    //@ts-ignore
    return this.loadNextPage(courseId, userId);
  }

  static async loadCurrentPage(userCourseDetails: UserCourseDetails): Promise<any> {
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
      courseId: userCourseDetails.courseId,
      sectionId: userCourseDetails.currentSectionId,
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
        let isUpdated = await UserCourseDetailsRepository.updateUserCourseProgress(userCourseProgress);
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
        let isUpdated = await UserCourseDetailsRepository.updateUserCourseProgress(userCourseProgress);
      }
    }
    //@ts-ignore
    let updatedUserCourseProgress = await UserCourseProgressRepository.getCourseProgressByCourseId(courseId, userId);
    return this.loadCurrentPage(updatedUserCourseProgress);
  }*/
  static async loadPreviousPage(courseId: string): Promise<any> {}
}
