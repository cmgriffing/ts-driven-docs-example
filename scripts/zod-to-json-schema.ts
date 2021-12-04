import { AnyZodObject, ZodObject, ZodTypeAny } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import * as requestSchemas from "../src/request-schemas";
import * as responseSchemas from "../src/response-schemas";
import * as fs from "fs-extra";

console.log({ responseSchemas });

Object.entries(requestSchemas).forEach(([key, schema]) => {
  const jsonSchema = zodToJsonSchema(schema, {
    name: key,
    target: "openApi3",
    definitionPath: "components/schemas" as any,
  });

  fs.outputFile(`schema/${key}.json`, JSON.stringify(jsonSchema, null, 2));
});

Object.entries(responseSchemas).forEach(([key, schema]) => {
  const jsonSchema = zodToJsonSchema(schema, {
    name: key,
    target: "openApi3",
    definitionPath: "components/schemas" as any,
  });

  fs.outputFile(`schema/${key}.json`, JSON.stringify(jsonSchema, null, 2));
});
