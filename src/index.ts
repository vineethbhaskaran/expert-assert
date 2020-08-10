import express, { Request, Response } from "express";
import * as courseRoutes from "./routes/courseRoutes";
import { port } from "./config";

const app = express();

//This initialize all routes and start listening to the application
const init = () => {
  app.use(express.json());
  app.use(courseRoutes.getAllCourses);
  app.use(courseRoutes.createCourse);
  app.listen(port, () => {
    console.log("The application is listening to port:" + port);
  });
};

init();
