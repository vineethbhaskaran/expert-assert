import mongoose, { Schema } from "mongoose";
import { auditSchema } from "./auditSchema";
import Course from "../types/Course";

export const courseScehma: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, requied: true },
  numberOfSections: { type: Number, requied: true },
  tenantId: { type: String, required: true },
  isPublished: { type: Boolean, required: true, default: false },
  isActive: { type: Boolean, required: true, default: true },
});
//adding audit schema to course schema
courseScehma.add(auditSchema);
const courseModel = mongoose.model<Course>("courseSchema", courseScehma);
export { courseModel };
