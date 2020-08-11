import { Router, Request, Response } from "express";
import * as logger from "../logger/customLogger";
import CourseService from "..//service/courseService";

const routes = Router();

export const getAllCourses = routes.get("/course", (request: Request, response: Response) => {
  response.json({ name: "Test course 1" });
});

export const createCourse = routes.post("/course", async (request: Request, response: Response) => {
  try {
    const resp = await CourseService.saveCourse(request.body);
    return response.json(resp);
  } catch (error) {
    logger.logMessage(error);
    return response.json(error);
  }
});
