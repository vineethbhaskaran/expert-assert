import { Router, Request, Response } from "express";
import * as logger from "../logger/customLogger";
import CourseService from "..//service/courseService";
import { ResponseUtils } from "../util/ResponseUtil";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants/constants";

const routes = Router();

/**
 * Route to get all courses available.The response data is with the pagination
 *  details.
 */
export const getAllCourses = routes.get("/course", async (request: Request, response: Response) => {
  // @ts-ignore  The string[] condition will be handled automatically
  const pageNo = parseInt(request.query.page) || DEFAULT_PAGE_NUMBER;
  // @ts-ignore  The string[] condition will be handled automatically
  const pageSize = parseInt(request.query.pageSize) || DEFAULT_PAGE_SIZE;
  try {
    const courseCount = await CourseService.getCourseCount();
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
/**
 * This POST method creates the course
 */
export const createCourse = routes.post("/course", async (request: Request, response: Response) => {
  try {
    const successResponse = await CourseService.saveCourse(request.body);
    return response.json(successResponse);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});
