import { Router, Request, Response } from "express";
import * as logger from "../logger/customLogger";

const routes = Router();

export const getAllCourses = routes.get("/course", (request: Request, response: Response) => {
  response.json({ name: "Test course 1" });
});

export const createCourse = routes.post("/course", (request: Request, response: Response) => {
  logger.logMessage("Course details submitted successfully");
  response.json(request.body);
});
