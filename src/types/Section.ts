import AuditFields from "./AuditFields";
export default interface Section extends AuditFields {
  name: string;
  sectionSequence: number;
  numberOfLessons?: number;
  tenantId: string;
  courseId: string;
  isFinalSection?: boolean; // This will be true for the last section
  isActive?: boolean;
}
