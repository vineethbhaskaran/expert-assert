const tsj = require("ts-json-schema-generator");
const fs = require("fs");

const config = {
  path: "./src/types/Course.ts",
  tsconfig: "./tsconfig.json",
  type: "Course", // Or <type-name> if you want to generate schema for that one type only
};

const output_path = "./src/validationSchema/CourseValidationSchema.json";

const schema = tsj.createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);
fs.writeFile(output_path, schemaString, (err: any) => {
  if (err) throw err;
});
