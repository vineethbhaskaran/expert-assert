import { PaginationDetails } from "../types/PaginationDetails";
/**
 * Response utils
 */
export class ResponseUtils {
  /**
   * Calculates pagination details
   * @param pageNo
   * @param pageSize
   * @param totalRecords
   * @returns pagination details
   */
  static retreivePaginationDetails(pageNo: number, pageSize: number, totalRecords: number): PaginationDetails {
    let recordsFrom = (pageNo - 1) * pageSize + 1;
    if (recordsFrom > totalRecords) recordsFrom = totalRecords;

    let recordsTo = recordsFrom + pageSize - 1;
    if (recordsTo > totalRecords) recordsTo = totalRecords;

    let hasNextPage = false;
    if (recordsTo < totalRecords) {
      hasNextPage = true;
    }
    let totalPages = 1;
    if (pageSize > 0) totalPages = Math.ceil(totalRecords / pageSize);

    return <PaginationDetails>{
      currentPage: pageNo,
      pageSize: pageSize,
      recordsFrom: recordsFrom,
      recordsTo: recordsTo,
      hasNextPage: hasNextPage,
      totalPages: totalPages,
    };
  }
}
