import * as ts from "typescript";
import { RouteOptions } from "../../src/types";
import { commonHeaders } from "../../src/middleware";

const printer = ts.createPrinter({});

export function getRouteMetadata(
  node: ts.Node,
  sourceFile: ts.SourceFile
): RouteOptions[] {
  const allNodes = [node];
  let nodeIndex = 0;

  const routeOptions: RouteOptions[] = [];

  while (allNodes.length > nodeIndex) {
    const currentNode = allNodes[nodeIndex];
    currentNode.forEachChild((childNode) => {
      allNodes.push(childNode);
    });

    nodeIndex += 1;
  }

  allNodes.forEach((childNode) => {
    if (childNode.decorators?.length) {
      childNode.decorators.forEach((decorator: any) => {
        let expression = decorator;
        while (expression.expression !== undefined) {
          expression = expression.expression;
        }
        const identifier = expression as ts.Identifier;

        if (identifier.text === "Route") {
          const args = decorator.expression.arguments;

          const stringifiedOptions = printer.printNode(
            ts.EmitHint.Unspecified,
            args[0],
            sourceFile
          );

          if (stringifiedOptions) {
            // this eval is not ideal
            const evalString = `const commonHeaders = ${JSON.stringify(
              commonHeaders
            )}; (${stringifiedOptions})`;
            const routeOptionObject = eval(evalString);
            routeOptions.push(routeOptionObject);
          }
        }
      });
    }
  });

  return routeOptions;
}
