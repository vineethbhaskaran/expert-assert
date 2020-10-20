import mongoose, { Schema } from "mongoose";
import { auditSchema } from "./auditSchema";
import Section from "../types/Section";

export const sectionScehma: Schema = new Schema({
  name: { type: String, required: true },
  sectionSequence: { type: Number, required: true },
  numberOfLessons: { type: Number, requied: true },
  isFinalSection: { type: Boolean, default: false },
  tenantId: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "courseSchema" },
  isActive: { type: Boolean, required: true, default: true },
});
//adding audit schema to course schema
sectionScehma.add(auditSchema);
const sectionModel = mongoose.model<Section>("sectionScehma", sectionScehma);
export { sectionModel };
