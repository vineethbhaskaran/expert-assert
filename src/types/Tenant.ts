import AuditFields from "./AuditFields";

export default interface Tenant extends AuditFields {
  name: string;
  code: string;
  ownerId: string;
  isActive: boolean;
}
