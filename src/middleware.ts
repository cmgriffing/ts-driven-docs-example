import { HttpResponse, HttpRequest } from "@architect/functions";

export const commonHeaders = {
  "access-control-allow-origins": "*",
  "access-control-allow-methods": "GET, POST, PUT, PATCH, DELETE",
  "access-control-allow-headers": "content-type",
  "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
  "content-type": "application/json; charset=utf8",
};

export function attachCommonHeaders(response: HttpResponse): HttpResponse {
  response.headers = {
    ...(response.headers || {}),
    ...commonHeaders,
  };
  return response;
}
