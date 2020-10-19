import AuditFields from "./AuditFields";

export default interface Course extends AuditFields {
  name: string;
  code: string;
  description: string;
  numberOfSections: number;
  tenantId: string;
  isPublished?: boolean;
  isActive?: boolean;
}
