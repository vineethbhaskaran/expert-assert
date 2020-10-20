const tsj = require("ts-json-schema-generator");
const fs = require("fs");
import * as logger from "./src/logger/customLogger";
import path from "path";

const outputDirectory = "./src/validationSchema";
//List of specs of all type for which schema need to be generated
const schemaConfigList = [
  {
    configInput: {
      path: "./src/types/Course.ts",
      tsconfig: "./tsconfig.json",
      type: "Course",
    },
    output_path: "./src/validationSchema/CourseValidationSchema.json",
  },
  {
    configInput: {
      path: "./src/types/Section.ts",
      tsconfig: "./tsconfig.json",
      type: "Section",
    },
    output_path: "./src/validationSchema/SectionValidationSchema.json",
  },
  {
    configInput: {
      path: "./src/types/Lesson.ts",
      tsconfig: "./tsconfig.json",
      type: "Lesson",
    },
    output_path: "./src/validationSchema/LessonValidationSchema.json",
  },
];

//TODO: Make this as sync Deleting all existing schemas from the output directory
/*fs.readdir(outputDirectory, (err: any, files: any) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(outputDirectory, file), (err: any) => {
      if (err) throw err;
    });
  }
});
*/

//Creating schemas

schemaConfigList.forEach((config) => {
  const schema = tsj.createGenerator(config.configInput).createSchema(config.configInput.type);
  const schemaString = JSON.stringify(schema, null, 2);
  fs.writeFile(config.output_path, schemaString, (err: any) => {
    if (err) {
      logger.logMessage("Error while generating schema for  " + config.configInput.type);
      throw err;
    } else {
      logger.logMessage("Schema generated for " + config.configInput.type);
    }
  });
});
