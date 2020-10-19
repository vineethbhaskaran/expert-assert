import mongoose, { Schema } from "mongoose";
import Tenant from "../types/tenant";
import { auditSchema } from "./auditSchema";

export const tenantSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  ownerId: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
});

//adding audit schema to tenant
tenantSchema.add(auditSchema);
const tenantModel = mongoose.model<Tenant>("tenantSchema", tenantSchema);
export { tenantModel };
