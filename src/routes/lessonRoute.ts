import { Router, Request, Response, request } from "express";
import * as logger from "../logger/customLogger";
import Lesson from "../types/Lesson";
import LessonService from "../service/LessonService";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  EMPTY_COURSE_ID,
  EMPTY_SECTION_ID,
  STATUS_CODE_400,
} from "../constants/constants";
import { ResponseUtils } from "../util/ResponseUtil";
import multer from "multer";
import AwsS3Util from "../util/AwsS3Util";
import path from "path";
import { FAILED, VALIDATION_ERROR_CODE } from "../constants/errorConstants";
import SectionService from "../service/SectionService";
import LessonHelper from "../helper/LessonHelper";

const lessonRoutes = Router();

export const getAllLessons = lessonRoutes.get("/lessons", async (request: Request, response: Response) => {
  // @ts-ignore  The string[] condition will be handled automatically
  const pageNo = parseInt(request.query.page) || DEFAULT_PAGE_NUMBER;
  // @ts-ignore  The string[] condition will be handled automatically
  const courseId: string = request.query.courseId || EMPTY_COURSE_ID;
  // @ts-ignore  The string[] condition will be handled automatically
  const sectionId: string = request.query.sectionId || EMPTY_SECTION_ID;

  try {
    let data = {};
    let lessonCount = await LessonService.getLessonCount();
    // @ts-ignore  The string[] condition will be handled automatically
    let pageSize = parseInt(request.query.pageSize) || lessonCount;

    if (courseId != null && sectionId != null) {
      lessonCount = await LessonService.getLessonCountByCourseIdSectionId(courseId, sectionId);
      // @ts-ignore  The string[] condition will be handled automatically
      pageSize = parseInt(request.query.pageSize) || lessonCount;
      data = await LessonService.getLessonsByCourseIdSectionId(pageNo, pageSize, lessonCount, courseId, sectionId);
    } else {
      data = await LessonService.getAllLessons(pageNo, pageSize, lessonCount);
    }
    const paginationDetails = ResponseUtils.retreivePaginationDetails(pageNo, pageSize, lessonCount);
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

export const getLessonById = lessonRoutes.get("/lessons/:lessonId", async (request: Request, response: Response) => {
  const lessonId = request.params.lessonId;
  try {
    const lessonObject = await LessonService.getLessonById(lessonId);
    return response.json(lessonObject);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});

export const createLesson = lessonRoutes.post("/lessons", async (request, response) => {
  const lesson: Lesson = <Lesson>request.body;
  try {
    await LessonHelper.validateLessonSeqence(lesson);

    //BEFORE SAVING: set last section final as false
    let lastLesson = await LessonService.getLastLessonByCourseIdSectionId(lesson.courseId, lesson.sectionId);
    if (typeof lastLesson !== "undefined" && lastLesson !== null) {
      lastLesson.isFinalLesson = false;
      await LessonService.updateLesson(lastLesson);
    }

    const successResponse = await LessonService.saveLesson(lesson);

    //TODO :move to different class
    //Incrementing number of sections in course
    const section = await SectionService.getSectionById(lesson.sectionId);
    let updatedNumberOfLessons = section.numberOfLessons + 1;
    section.numberOfLessons = updatedNumberOfLessons;
    let isUpdated = await SectionService.updateSection(section);

    //AFTER SAVING: set last section final as false
    lastLesson = await LessonService.getLastLessonByCourseIdSectionId(lesson.courseId, lesson.sectionId);
    if (typeof lastLesson !== "undefined" && lastLesson !== null) {
      lastLesson.isFinalLesson = true;
      await LessonService.updateLesson(lastLesson);
    }

    response.json(successResponse);
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

export const updateLesson = lessonRoutes.put("/lessons/:lessonId", async (request: Request, response: Response) => {
  const lesson = <Lesson>request.body;
  lesson.id = request.params.lessonId;
  try {
    const currentLesson = await LessonService.getLessonById(lesson.id);
    //updating the lesson sequence
    if (typeof lesson.lessonSequence !== "undefined" && lesson.lessonSequence !== null) {
      currentLesson.lessonSequence = lesson.lessonSequence;
      await LessonHelper.validateLessonSeqence(currentLesson);
    }

    //BEFORE SAVING: set last section final as false
    let lastLesson = await LessonService.getLastLessonByCourseIdSectionId(
      currentLesson.courseId,
      currentLesson.sectionId
    );
    if (typeof lastLesson !== "undefined" && lastLesson !== null) {
      lastLesson.isFinalLesson = false;
      await LessonService.updateLesson(lastLesson);
    }

    const successResponse = await LessonService.updateLesson(lesson);

    //AFTER SAVING: set last section final as false
    lastLesson = await LessonService.getLastLessonByCourseIdSectionId(currentLesson.courseId, currentLesson.sectionId);
    if (typeof lastLesson !== "undefined" && lastLesson !== null) {
      lastLesson.isFinalLesson = true;
      await LessonService.updateLesson(lastLesson);
    }

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

export const deleteLesson = lessonRoutes.delete("/lessons/:lessonId", async (request: Request, response: Response) => {
  const lessonId = request.params.lessonId;
  try {
    const lesson = await LessonService.getLessonById(lessonId);

    const lessonObject = await LessonService.softDeleteLesson(lessonId);
    //TODO :move to different class
    //Incrementing number of sections in course
    const section = await SectionService.getSectionById(lesson.sectionId);
    let updatedNumberOfLessons = section.numberOfLessons - 1;
    section.numberOfLessons = updatedNumberOfLessons;
    let isUpdated = await SectionService.updateSection(section);

    return response.json(lessonObject);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});
/**
 * File uploads
 */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    AwsS3Util.uploadToS3(file);
    cb(null, process.cwd() + "/temp");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//var storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const uploadLesson = lessonRoutes.post(
  "/lessons/upload",
  upload.single("file-to-upload"),
  (request: Request, response: Response) => {
    // AwsS3Util.uploadToS3(request.file);
    logger.logMessage("Title name:" + request.body.title);
    return response.json(true);
  }
);
