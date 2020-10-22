import { Router, Request, Response } from "express";
import SectionService from "../service/SectionService";
import * as logger from "../logger/customLogger";
import UserCourseDetailsService from "../service/UserCourseDetailsService";

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

//TO BE DELETED: test end points
export const getNextSection = routes.get("/nextSection", async (request: Request, response: Response) => {
  const courseId = request.query.courseId;
  const sectionSequence = request.query.sectionSequence;
  try {
    //@ts-ignore
    const nextSection = await SectionService.getNextSection(courseId, sectionSequence);
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
    const previousSection = await SectionService.getPreviousSection(courseId, sectionSequence);
    return response.json(previousSection);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});
