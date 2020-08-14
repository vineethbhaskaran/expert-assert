import AuditFields from "./AuditFields";

export default interface Lesson extends AuditFields {
  title: String;
  sequence: number;
  contents: String;
  courseId: String;
  sectionId: String;
  isActive: boolean;
}
