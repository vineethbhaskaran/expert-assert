import AuditFields from "./AuditFields";

export default interface Course extends AuditFields {
  name: String;
  code: String;
  description: String;
  isPublished: Boolean;
  isActive: Boolean;
}
