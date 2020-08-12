export interface PaginationDetails {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  hasNextPage: boolean;
  recordsFrom: number;
  recordsTo: number;
  totalPages: number;
}
