import Lesson from "../types/Lesson";
import { Validator } from "jsonschema";
import { SchemaValidationError } from "./SchemaValidationError";
import ExpertAssertError from "../types/ExpertAssertError";
const lessonValidationSchema = require("../validationSchema/LessonValidationSchema.json");

export class LessonValidator {
  static async validateLesson(lesson: Lesson): Promise<any> {
    return new Promise((resolve, reject) => {
      const jsonSchemaValidator = new Validator();
      const result = jsonSchemaValidator.validate(lesson, lessonValidationSchema);

      const validationErrors: SchemaValidationError[] = [];

      if (result.errors.length !== 0) {
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
