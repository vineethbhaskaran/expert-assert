import mongoose, { Schema } from "mongoose";
import UserCourseProgress from "../types/UserCourseProgress";
import { auditSchema } from "./auditSchema";

export const userCourseProgressSchema: Schema = new Schema({
  userId: { type: String },
  tenantId: { type: String },
  courseId: { type: Schema.Types.ObjectId, ref: "courseSchema" },
  currentSectionId: { type: Schema.Types.ObjectId, ref: "sectionSchema" },
  currentLessonId: { type: Schema.Types.ObjectId, ref: "lessonSchema" },
  timeSpent: { type: Number },
});

userCourseProgressSchema.add(auditSchema);
export const userCourseProgressModel = mongoose.model<UserCourseProgress>(
  "userCourseProgressSchema",
  userCourseProgressSchema
);
