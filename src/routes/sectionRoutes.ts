import { Router, Request, Response } from "express";
import Section from "../types/Section";
import * as logger from "../logger/customLogger";
import SectionService from "../service/SectionService";
import { ResponseUtils } from "../util/ResponseUtil";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE,EMPTY_COURSE_ID } from "../constants/constants";

const sectionRoutes = Router();
/** If courseId passed as parameter. This endpoint will return the sections belong to that
 * course
*/
export const getAllSections = sectionRoutes.get("/sections", async (request: Request, response: Response) => {
  // @ts-ignore  The string[] condition will be handled automatically
  const pageNo = parseInt(request.query.page) || DEFAULT_PAGE_NUMBER;
  
  // @ts-ignore  The string[] condition will be handled automatically
  const courseId:string = request.query.courseId || EMPTY_COURSE_ID;
  try {
    let sectionCount = await SectionService.getSectionCount();
    // @ts-ignore  The string[] condition will be handled automatically
    let pageSize:number = parseInt(request.query.pageSize) || sectionCount;
    let data={};
    if(courseId!=null){
      sectionCount=await SectionService.getSectionCountByCourseId(courseId);
      // @ts-ignore  The string[] condition will be handled automatically
      pageSize = parseInt(request.query.pageSize) || sectionCount;
      data = await SectionService.getSectionsByCourse(pageNo, pageSize, sectionCount,courseId);
    }else{
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
    return response.json(successResponse);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
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
      const sectionObject = await SectionService.softDeleteSection(sectionId);
      return response.json(sectionObject);
    } catch (errorResponse) {
      logger.logMessage(errorResponse);
      return response.json(errorResponse);
    }
  }
);
