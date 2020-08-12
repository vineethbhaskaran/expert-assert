import mongoose, { Schema } from "mongoose";
import Icourse from "../types/Icourse";
import { auditSchema } from "./auditSchema";

const courseScehma: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, requied: true },
  isPublished: { type: Boolean, required: true, default: false },
  isActive: { type: Boolean, required: true, default: true },
});
//adding audit schema to course schema
courseScehma.add(auditSchema);
const courseModel = mongoose.model<Icourse>("course", courseScehma);
export { courseModel };
