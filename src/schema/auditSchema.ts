import mongoose, { Schema } from "mongoose";
import AuditFields from "../types/AuditFields";

const auditSchema: Schema = new Schema({
  createdBy: { type: String, default: "vineeth" },
  createdDate: { type: Date, required: true, default: Date.now() },
  updatedBy: { type: String, default: "vineeth" },
  updatedDate: { type: Date, default: Date.now() },
});

const auditModel = mongoose.model<AuditFields>("auditDetails", auditSchema);
export { auditSchema, auditModel };
