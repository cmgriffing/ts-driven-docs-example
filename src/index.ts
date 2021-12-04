import * as arc from "@architect/functions";
import { HttpResponse, HttpRequest } from "@architect/functions";
import { Route } from "../src/types";
import { commonHeaders, attachCommonHeaders } from "./middleware";

// This is a handler for the format that Architect expects. It could work similarly for Express, Koa, etc. It just needs a class wrapper to be able to decorate it.
class Handler {
  @Route({
    summary: "",
    description: "",
    path: "/teams",
    headers: {
      ...commonHeaders,
    },
    method: "POST",
    requestJsonSchemaPath: "postTeamRequestSchema.json",
    responseJsonSchemaPath: "postTeamResponseSchema.json",
    errorJsonSchemaPath: "errorResponseSchema.json",
    definedErrors: [400, 500],
  })
  static get() {
    return arc.http.async(async function http(
      req: HttpRequest
    ): Promise<HttpResponse> {
      try {
        return attachCommonHeaders({
          statusCode: 200,
          json: { ownedTeams: req.ownedTeams, joinedTeams: req.joinedTeams },
        });
      } catch (e) {
        console.log("Unhandled Error: ");
        console.log(e);
        return {
          statusCode: 500,
        };
      }
    });
  }
}

exports.handler = Handler.get();
