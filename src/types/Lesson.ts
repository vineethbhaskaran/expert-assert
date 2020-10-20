import AuditFields from "./AuditFields";

export default interface Lesson extends AuditFields {
  name: string;
  lessonSequence: number;
  contents?: string;
  fileLocation?: string;
  tenantId: string;
  courseId: string;
  sectionId: string;
  isFinalLesson?: boolean;
  isActive?: boolean;
}
