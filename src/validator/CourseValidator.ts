import Course from "../types/Course";
import { Validator } from "jsonschema";
const courseValidationSchema = require("../validationSchema/CourseValidationSchema.json");
//import courseValidationSchema from "../validationSchema/CourseValidationSchema.json";
import { SchemaValidationError } from "./SchemaValidationError";
import ExpertAssertError from "../types/ExpertAssertError";

export class CourseValidator {
  static async validateCourse(course: Course): Promise<any> {
    return new Promise((resolve, reject) => {
      const jsonSchemaValidator = new Validator();
      const result = jsonSchemaValidator.validate(course, courseValidationSchema);

      const validationErrors: SchemaValidationError[] = [];

      if (result.errors.length !== 0) {
        //creating custom error object
        //reject(new ExpertAssertError("ValidationError", result.errors));
        //return;
        result.errors.forEach((error) => {
          validationErrors.push({
            validationErrorType: error.name,
            property: error.property,
            argument: error.argument,
            message: error.message.replace(/['"]+/g, ""),
            details: error.stack.replace(/['"]+/g, ""),
          });
        });
        reject(new ExpertAssertError("ValidationError", validationErrors));
        return;
      }
      resolve(result);
    });
  }
}
