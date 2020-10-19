import { Document } from "mongoose";

export default interface AuditFields extends Document {
  createdBy?: String;
  createdDate?: Date;
  updatedBy?: String;
  updatedDate?: Date;
}
