import { Router, Request, Response } from "express";
import Section from "../types/Section";
import * as logger from "../logger/customLogger";
import SectionService from "../service/SectionService";
import { ResponseUtils } from "../util/ResponseUtil";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, EMPTY_COURSE_ID, STATUS_CODE_400 } from "../constants/constants";
import { FAILED, VALIDATION_ERROR_CODE } from "../constants/errorConstants";
import CourseService from "../service/courseService";

const sectionRoutes = Router();
/** If courseId passed as parameter. This endpoint will return the sections belong to that
 * course
 */
export const getAllSections = sectionRoutes.get("/sections", async (request: Request, response: Response) => {
  // @ts-ignore  The string[] condition will be handled automatically
  const pageNo = parseInt(request.query.page) || DEFAULT_PAGE_NUMBER;

  // @ts-ignore  The string[] condition will be handled automatically
  const courseId: string = request.query.courseId || EMPTY_COURSE_ID;
  try {
    let sectionCount = await SectionService.getSectionCount();
    // @ts-ignore  The string[] condition will be handled automatically
    let pageSize: number = parseInt(request.query.pageSize) || sectionCount;
    let data = {};
    if (courseId != null) {
      sectionCount = await SectionService.getSectionCountByCourseId(courseId);
      // @ts-ignore  The string[] condition will be handled automatically
      pageSize = parseInt(request.query.pageSize) || sectionCount;
      data = await SectionService.getSectionsByCourse(pageNo, pageSize, sectionCount, courseId);
    } else {
      data = await SectionService.getAllSections(pageNo, pageSize, sectionCount);
    }

    const paginationDetails = ResponseUtils.retreivePaginationDetails(pageNo, pageSize, sectionCount);
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

export const getSectionById = sectionRoutes.get(
  "/sections/:sectionId",
  async (request: Request, response: Response) => {
    const sectionId = request.params.sectionId;
    try {
      const sectionObject = await SectionService.getSectionById(sectionId);
      return response.json(sectionObject);
    } catch (errorResponse) {
      logger.logMessage(errorResponse);
      return response.json(errorResponse);
    }
  }
);

export const createSection = sectionRoutes.post("/sections", async (request: Request, response: Response) => {
  const section = <Section>request.body;
  try {
    const successResponse = await SectionService.saveSection(section);
    //TODO :move to different class
    //Incrementing number of sections in course
    const course = await CourseService.getCourseById(section.courseId);
    let updatedNumberOfSections = course.numberOfSections + 1;
    course.numberOfSections = updatedNumberOfSections;
    let isUpdated = await CourseService.updateCourse(course);

    logger.logMessage("Number of Sections updated");
    return response.json(successResponse);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    if (errorResponse.name === VALIDATION_ERROR_CODE) {
      return response
        .json({
          status: FAILED,
          error: errorResponse.name,
          details: errorResponse.data,
        })
        .status(STATUS_CODE_400);
    } else {
      return response
        .json({
          status: FAILED,
          error: "Save Section Error",
          details: errorResponse,
        })
        .status(STATUS_CODE_400);
    }
  }
});

export const updateSection = sectionRoutes.put("/sections/:sectionId", async (request: Request, response: Response) => {
  const section = <Section>request.body;
  section.id = request.params.sectionId;
  try {
    const successResponse = await SectionService.updateSection(section);
    return response.json(successResponse);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});
export const deleteSection = sectionRoutes.delete(
  "/sections/:sectionId",
  async (request: Request, response: Response) => {
    const sectionId = request.params.sectionId;
    try {
      //retrive section before deletion.To get courseId
      const section = await SectionService.getSectionById(sectionId);

      const sectionObject = await SectionService.softDeleteSection(sectionId);
      //TODO :move to different class
      //Incrementing number of sections in course

      const course = await CourseService.getCourseById(section.courseId);
      let updatedNumberOfSections = course.numberOfSections - 1;
      course.numberOfSections = updatedNumberOfSections;
      let isUpdated = await CourseService.updateCourse(course);

      return response.json(sectionObject);
    } catch (errorResponse) {
      logger.logMessage(errorResponse);
      return response.json(errorResponse);
    }
  }
);
