import { Router, Request, Response } from "express";
import * as logger from "../logger/customLogger";
import UserCourseProgressService from "../service/UserCourseProgressService";

const routes = Router();

export const getCourseProgress = routes.get("/courseProgress", async (request: Request, response: Response) => {
  const courseId = request.query.courseId;
  try {
    //@ts-ignore
    const userProgress = await UserCourseProgressService.loadfirstPage(courseId);
    return response.json(userProgress);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});
