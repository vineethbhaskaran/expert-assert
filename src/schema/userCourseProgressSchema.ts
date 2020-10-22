import mongoose, { Schema } from "mongoose";
import UserCourseDetails from "../types/UserCourseDetails";
import { auditSchema } from "./auditSchema";

export const userCourseDetailsSchema: Schema = new Schema({
  userId: { type: String },
  tenantId: { type: String },
  courseId: { type: Schema.Types.ObjectId, ref: "courseSchema" },
  currentSectionId: { type: Schema.Types.ObjectId, ref: "sectionSchema" },
  currentLessonId: { type: Schema.Types.ObjectId, ref: "lessonSchema" },
  timeSpent: { type: Number },
});

userCourseDetailsSchema.add(auditSchema);
export const userCourseDetailsModel = mongoose.model<UserCourseDetails>(
  "userCourseDetailsSchema",
  userCourseDetailsSchema
);
