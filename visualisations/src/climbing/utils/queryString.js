import queryString from "query-string";

const query = queryString.parse(window.location.search);

export const queryStringUserId =
  query && query.userId && /^[0-9]+$/.test(query.userId)
    ? query.userId
    : undefined;

export const queryStringType =
  query && query.type && /^(routes)|(boulders)$/.test(query.type)
    ? query.type
    : undefined;
