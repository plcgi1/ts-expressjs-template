import ISearchOptions from "../interfaces/search-options.interface";

export default function pagination(query: ISearchOptions) {
    const options: ISearchOptions = {
        limit: 100,
        skip: 0,
        sort:  {
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
