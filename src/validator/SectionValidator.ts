import Section from "../types/Section";
import { Validator } from "jsonschema";
import { SchemaValidationError } from "./SchemaValidationError";
import ExpertAssertError from "../types/ExpertAssertError";
const sectionValidationSchema = require("../validationSchema/SectionValidationSchema.json");

export class SectionValidator {
  static async validateSection(section: Section): Promise<any> {
    return new Promise((resolve, reject) => {
      const jsonSchemaValidator = new Validator();
      const result = jsonSchemaValidator.validate(section, sectionValidationSchema);

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
