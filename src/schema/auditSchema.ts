import mongoose, { Schema } from "mongoose";
import AuditFields from "../types/AuditFields";

const auditSchema: Schema = new Schema(
  {
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  {
    timestamps: true,
  }
);
const auditModel = mongoose.model<AuditFields>("auditSchema", auditSchema);
export { auditSchema, auditModel };
