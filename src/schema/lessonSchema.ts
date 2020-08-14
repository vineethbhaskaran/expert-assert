import mongoose, { Schema } from "mongoose";
import { auditSchema } from "./auditSchema";
import Lesson from "../types/Lesson";

export const lessonSchema: Schema = new Schema({
  name: { type: String, required: true },
  sequence: { type: Number, required: true },
  contents: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: "sectionSchema" },
  courseId: { type: Schema.Types.ObjectId, ref: "courseSchema" },
  isActive: { type: Boolean, required: true, default: true },
});
lessonSchema.add(auditSchema);
export const lessonModel = mongoose.model<Lesson>("lessonSchema", lessonSchema);
