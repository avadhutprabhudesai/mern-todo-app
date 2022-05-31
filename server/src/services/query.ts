import { PaginationInput, PaginationOutput } from '../types';

const DEFAULT_LIMIT = 10;
const DEFAULT_SKIP = 0;

function getPagination(query: PaginationInput): PaginationOutput {
  const limit = Math.abs(query.limit || DEFAULT_LIMIT);
  const skip = (Math.abs(query.page) - 1) * limit || DEFAULT_SKIP;

  return {
    limit,
    skip,
  };
}

function isValidPaginationQueryParam(val: string | undefined): boolean {
  return Boolean(val && isFinite(+val));
}

export { getPagination, isValidPaginationQueryParam };
