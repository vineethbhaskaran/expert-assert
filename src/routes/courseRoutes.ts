import { Router, Request, Response } from "express";
import * as logger from "../logger/customLogger";
import CourseService from "..//service/courseService";

const routes = Router();

export const getAllCourses = routes.get("/course", async (request: Request, response: Response) => {
  try {
    const successResponse = await CourseService.getAllCourses();
    return response.json(successResponse);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});

export const createCourse = routes.post("/course", async (request: Request, response: Response) => {
  try {
    const successResponse = await CourseService.saveCourse(request.body);
    return response.json(successResponse);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});
