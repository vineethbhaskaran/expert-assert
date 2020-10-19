import { Router, Request, Response } from "express";
import * as logger from "../logger/customLogger";
import CourseService from "..//service/courseService";
import { ResponseUtils } from "../util/ResponseUtil";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants/constants";
import Course from "../types/Course";
import TokenService from "../security/TokenService";

const routes = Router();

/**
 * Route to get all courses available.The response data is with the pagination
 *  details.
 */
export const getAllCourses = routes.get("/courses", async (request: Request, response: Response) => {
  // @ts-ignore  The string[] condition will be handled automatically
  const pageNo = parseInt(request.query.page) || DEFAULT_PAGE_NUMBER;

  try {
    const courseCount = await CourseService.getCourseCount();
    // @ts-ignore  The string[] condition will be handled automatically
    const pageSize = parseInt(request.query.pageSize) || courseCount;
    const data = await CourseService.getAllCourses(pageNo, pageSize, courseCount);
    const paginationDetails = ResponseUtils.retreivePaginationDetails(pageNo, pageSize, courseCount);
    const successResponse = {
      meta: paginationDetails,
      data: data,
    };
    return response.json(successResponse);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});

export const getCourseById = routes.get("/courses/:courseId", async (request: Request, response: Response) => {
  const courseId = request.params.courseId;
  try {
    const courseObject = await CourseService.getCourseById(courseId);
    return response.json(courseObject);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});

/**
 * This POST method creates the course
 */
export const createCourse = routes.post("/courses", async (request: Request, response: Response) => {
  try {
    const course = <Course>request.body;
    const successResponse = await CourseService.saveCourse(course);
    return response.json(successResponse);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});

export const updateCourse = routes.put("/courses/:courseId", async (request: Request, response: Response) => {
  const course = <Course>request.body;
  course.id = request.params.courseId;
  try {
    const successResponse = await CourseService.updateCourse(course);
    return response.json(successResponse);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});
export const deleteCourse = routes.delete("/courses/:courseId", async (request: Request, response: Response) => {
  const courseId = request.params.courseId;
  try {
    const courseObject = await CourseService.softDeleteCourse(courseId);
    return response.json(courseObject);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});
