"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pagination(query) {
    const options = {
        limit: 100,
        skip: 0,
        sort: {
            dateCreated: query.sorder ? parseInt(query.sorder, 10) : -1
        }
    };
    if (query.sortby) {
        options.sort[query.sortby] = options.sort[query.sortby];
    }
    if (query.limit) {
        options.limit = query.limit;
    }
    if (query.skip) {
        options.skip = query.skip;
    }
    return options;
}
exports.default = pagination;
//# sourceMappingURL=pagination.js.map