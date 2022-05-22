const DEFAULT_LIMIT = 10;
const DEFAULT_SKIP = 0;

function getPagination(query) {
  const limit = Math.abs(query.limit) || DEFAULT_LIMIT;
  const skip = (Math.abs(query.page) - 1) * limit || DEFAULT_SKIP;

  return {
    limit,
    skip,
  };
}

module.exports = {
  getPagination,
};
