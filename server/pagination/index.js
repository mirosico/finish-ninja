export default function (req) {
    const page = +req.query.page;
    const limit = +req.query.limit;

    const startIndex = (page - 1) * limit > 0 ? (page - 1) * limit : 0;

    const nextPageIndex = page * limit;

    const pagination = {};
    pagination.startIndex = startIndex;
    pagination.nextPageIndex = nextPageIndex;
    pagination.previous = startIndex > 0 ? page - 1 : null;
    pagination.next = page + 1; // if nextPageIndex < filteredDataCount, otherwise null
    pagination.page = page || 0;
    pagination.limit = limit || 0;

    return pagination;
};