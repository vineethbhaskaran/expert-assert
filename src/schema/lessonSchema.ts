import mongoose, { Schema } from "mongoose";
import { auditSchema } from "./auditSchema";
import Lesson from "../types/Lesson";

export const lessonSchema: Schema = new Schema({
  name: { type: String, required: true },
  lessonSequence: { type: Number, required: true },
  contents: { type: String },
  fileLocation: { type: String },
  tenantId: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "courseSchema" },
  sectionId: { type: Schema.Types.ObjectId, ref: "sectionSchema" },
  isFinalLesson: { type: Boolean, default: false },
  isActive: { type: Boolean, required: true, default: true },
});
lessonSchema.add(auditSchema);
export const lessonModel = mongoose.model<Lesson>("lessonSchema", lessonSchema);
