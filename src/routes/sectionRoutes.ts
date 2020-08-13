import { Router, Request, Response } from "express";
import Section from "../types/Section";
import * as logger from "../logger/customLogger";
import SectionService from "../service/SectionService";
import { ResponseUtils } from "../util/ResponseUtil";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants/constants";

const sectionRoutes = Router();
export const getAllSections = sectionRoutes.get("/sections", async (request: Request, response: Response) => {
  // @ts-ignore  The string[] condition will be handled automatically
  const pageNo = parseInt(request.query.page) || DEFAULT_PAGE_NUMBER;
  // @ts-ignore  The string[] condition will be handled automatically
  const pageSize = parseInt(request.query.pageSize) || DEFAULT_PAGE_SIZE;
  try {
    const sectionCount = await SectionService.getSectionCount();
    const data = await SectionService.getAllSections(pageNo, pageSize, sectionCount);
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
