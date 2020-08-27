import express, { Request, Response } from "express";
import * as courseRoutes from "./routes/courseRoutes";
import * as sectionRoutes from "./routes/sectionRoutes";
import * as lessonRoutes from "./routes/lessonRoute";
import * as loginRoutes from "./routes/loginRoutes";
import { port, dbConnectionUrl } from "./config";
import mongoose from "mongoose";
import * as logger from "./logger/customLogger";
import bodyParser from "body-parser";

const app = express();

//This initialize all routes and start listening to the application
const init = async () => {
  try {
    await dbConnect();
    logger.logMessage("successfully connected to DB");
    app.use(express.json());
    app.use(bodyParser.raw());
    //JWT token routes
    app.use(loginRoutes.login);
    app.use(loginRoutes.token);
    //Registering course
    app.use(courseRoutes.getAllCourses);
    app.use(courseRoutes.getCourseById);
    app.use(courseRoutes.createCourse);
    app.use(courseRoutes.updateCourse);
    app.use(courseRoutes.deleteCourse);
    //Registring section
    app.use(sectionRoutes.getAllSections);
    app.use(sectionRoutes.getSectionById);
    app.use(sectionRoutes.createSection);
    app.use(sectionRoutes.updateSection);
    app.use(sectionRoutes.deleteSection);
    //Registering session
    app.use(lessonRoutes.createLesson);

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
