import { Router, Request, Response } from "express";

const routes = Router();

export const getAllCourses = routes.get("/course", (request: Request, response: Response) => {
  response.json({ name: "Test course 1" });
});

export const createCourse = routes.post("/course", (request: Request, response: Response) => {
  response.json(request.body);
});
