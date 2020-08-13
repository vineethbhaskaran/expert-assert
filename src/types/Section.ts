import AuditFields from "./AuditFields";
import Course from "./Course";
import { Schema } from "mongoose";

export default interface Section extends AuditFields {
  name: String;
  sectionNumber: number;
  course: String;
  numberOfSessions: number;
  isActive: Boolean;
}
