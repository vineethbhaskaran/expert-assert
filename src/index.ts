import express, { Request, Response } from "express";
import * as courseRoutes from "./routes/courseRoutes";
import * as sectionRoutes from "./routes/sectionRoutes";
import * as lessonRoutes from "./routes/lessonRoute";
import * as loginRoutes from "./routes/loginRoutes";
import * as userCourseProgressRoute from "./routes/UserCourseProgressRoute";
import mongoose from "mongoose";
import * as logger from "./logger/customLogger";
import bodyParser from "body-parser";
import cors from "cors";
import environmentToExport from "./config";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

const app = express();

const port = environmentToExport.app.port;
const dbConnectionUrl = environmentToExport.db.dbConnectionUrl;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://vineeth-tenant.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://vineeth-express-app",
  issuer: "https://vineeth-tenant.us.auth0.com/",
  algorithms: ["RS256"],
});

//This initialize all routes and start listening to the application
const init = async () => {
  try {
    await dbConnect();
    logger.logMessage("successfully connected to DB");
    app.use(express.json());
    app.use(bodyParser.raw());

    //cors configuration
    app.use(cors());

    //JWT token routes
    //app.use(loginRoutes.login);
    //app.use(loginRoutes.token);
    app.use(jwtCheck);

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

    //Registering lesson
    app.use(lessonRoutes.getAllLessons);
    app.use(lessonRoutes.getLessonById);
    app.use(lessonRoutes.createLesson);
    app.use(lessonRoutes.updateLesson);
    app.use(lessonRoutes.deleteLesson);

    app.use(userCourseProgressRoute.getCourseProgress);

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
