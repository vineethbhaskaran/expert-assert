import express, { Request, Response } from "express";
import * as courseRoutes from "./routes/courseRoutes";
import { port, dbConnectionUrl } from "./config";
import mongoose, { Schema, Document } from "mongoose";
import * as logger from "./logger/customLogger";

const app = express();

//This initialize all routes and start listening to the application
const init = async () => {
  try {
    await dbConnect();
    logger.logMessage("successfully connected to DB");
    app.use(express.json());
    app.use(courseRoutes.getAllCourses);
    app.use(courseRoutes.createCourse);
    app.listen(port, () => {
      logger.logMessage("The application is listening to port:" + port);
    });
  } catch (error) {
    logger.logMessage("Error while connecting DB");
  }
};

const dbConnect = async () => {
  return mongoose.connect(dbConnectionUrl, { useNewUrlParser: true });
};

init();
