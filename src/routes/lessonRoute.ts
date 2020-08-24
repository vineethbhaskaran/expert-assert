import { Router, Request, Response, request } from "express";
import * as logger from "../logger/customLogger";
import Lesson from "../types/Lesson";
import LessonService from "../service/LessonService";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants/constants";
import { ResponseUtils } from "../util/ResponseUtil";
import multer from "multer";
import AwsS3Util from "../util/AwsS3Util";

const lessonRoutes = Router();

export const getAllLessons = lessonRoutes.get("/lessons", async (request: Request, response: Response) => {
  // @ts-ignore  The string[] condition will be handled automatically
  const pageNo = parseInt(request.query.page) || DEFAULT_PAGE_NUMBER;
  // @ts-ignore  The string[] condition will be handled automatically
  const pageSize = parseInt(request.query.pageSize) || DEFAULT_PAGE_SIZE;
  try {
    const lessonCount = await LessonService.getLessonCount();
    const data = await LessonService.getAllLessons(pageNo, pageSize, lessonCount);
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
    const successResponse = await LessonService.saveLesson(lesson);
    response.json(successResponse);
  } catch (error) {
    logger.logMessage(error);
    response.json(error);
  }
});

export const updateLesson = lessonRoutes.put("/lessons/:lessonId", async (request: Request, response: Response) => {
  const lesson = <Lesson>request.body;
  lesson.id = request.params.lessonId;
  try {
    const successResponse = await LessonService.updateLesson(lesson);
    return response.json(successResponse);
  } catch (errorResponse) {
    logger.logMessage(errorResponse);
    return response.json(errorResponse);
  }
});

export const deleteLesson = lessonRoutes.delete("/lessons/:lessonId", async (request: Request, response: Response) => {
  const lessonId = request.params.lessonId;
  try {
    const lessonObject = await LessonService.softDeleteLesson(lessonId);
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
    cb(null, "../../temp");
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
    AwsS3Util.uploadToS3(request.file);
    logger.logMessage("Title name:" + request.body.title);
    return response.json(true);
  }
);
