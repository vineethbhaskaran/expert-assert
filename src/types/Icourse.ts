import { Document } from "mongoose";
import AuditFields from "./AuditFields";

export default interface Icourse extends AuditFields {
  name: String;
  code: String;
  description: String;
  isPublished: Boolean;
  isActive: Boolean;
}
