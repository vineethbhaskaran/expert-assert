import AuditFields from "./AuditFields";

export default interface UserCourseProgress extends AuditFields {
  userId: String;
  tenantId: String;
  courseId: String;
  currentSectionId: String;
  currentLessonId: String;
}
