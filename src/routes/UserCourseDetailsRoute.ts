import { Router, Request, Response } from "express";
import * as logger from "../logger/customLogger";
import UserCourseDetailsService from "../service/UserCourseDetailsService";
import courseService from "../service/CourseService";
import sectionService from "../service/SectionService";
import lessonService from "../service/LessonService";
import { CurrentCourseContent } from "../types/CurrentCourseContent";
import Course from "../types/Course";
import Section from "../types/Section";
import Lesson from "../types/Lesson";

const routes = Router();

export const getCourseProgress = routes.get("/courseProgress", async (request: Request, response: Response) => {
  const courseId = request.query.courseId;
  try {
    //@ts-ignore
    const userProgress = await UserCourseDetailsService.loadfirstPage(courseId);
    return response.json(userProgress);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});

export const getCurrentPageDetails = routes.get(
  "/getCurrentPageDetails",
  async (request: Request, response: Response) => {
    const courseId = request.query.courseId;
    const userId = request.query.userId;
    try {
      //@ts-ignore
      const userProgress = await UserCourseDetailsService.getCurrentPageDetails(courseId, userId);
      return response.json(userProgress);
    } catch (errorResponse) {
      logger.logMessage(errorResponse);
      return response.json(errorResponse);
    }
  }
);
/**
 * Endpoint for display the course content for student view or
 */
export const getCurrentCourseContent = routes.get(
  "/currentLesson/:courseId/:sectionId/:lessonId",
  async (request: Request, response: Response) => {
    const courseId = request.params.courseId;
    const sectionId = request.params.sectionId;
    const lessonId = request.params.lessonId;

    try {
      const course = <Course>await courseService.getCourseById(courseId);
      const section = <Section>await sectionService.getSectionById(sectionId);
      const lesson = <Lesson>await lessonService.getLessonById(lessonId);

      let currentCourseContent = new CurrentCourseContent(
        course.id,
        course.name,
        section.id,
        section.name,
        lesson.id,
        lesson.name,
        lesson.lessonSequence,
        //@ts-ignore
        lesson.contents,
        lesson.isFinalLesson
      );
      return response.json(currentCourseContent);
    } catch (errorResponse) {
      logger.logMessage(errorResponse);
      return response.json(errorResponse);
    }
  }
);

//TO BE DELETED: test end points
export const getNextSection = routes.get("/nextSection", async (request: Request, response: Response) => {
  const courseId = request.query.courseId;
  const sectionSequence = request.query.sectionSequence;
  try {
    //@ts-ignore
    const nextSection = await sectionService.getNextSection(courseId, sectionSequence);
    return response.json(nextSection);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});

export const getPrevSection = routes.get("/prevSection", async (request: Request, response: Response) => {
  const courseId = request.query.courseId;
  const sectionSequence = request.query.sectionSequence;
  try {
    //@ts-ignore
    const previousSection = await sectionService.getPreviousSection(courseId, sectionSequence);
    return response.json(previousSection);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});

export const getNextLesson = routes.get("/nextLesson", async (request: Request, response: Response) => {
  const courseId = request.query.courseId;
  const sectionId = request.query.sectionId;
  const lessonSequence = request.query.lessonSequence;
  try {
    //@ts-ignore
    const nextLesson = await lessonService.getNextLessonByCourseIdSectionId(courseId, sectionId, lessonSequence);
    return response.json(nextLesson);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});

export const getPrevLesson = routes.get("/previousLesson", async (request: Request, response: Response) => {
  const courseId = request.query.courseId;
  const sectionId = request.query.sectionId;
  const lessonSequence = request.query.lessonSequence;
  try {
    //@ts-ignore
    const nextLesson = await lessonService.getPrevoiusLessonByCourseIdSectionId(courseId, sectionId, lessonSequence);
    return response.json(nextLesson);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});
