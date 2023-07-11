import { parse } from "parse5";
import { Document, Element } from "parse5/dist/tree-adapters/default";
import { validateImageAttributes } from "../src/validators/image";
import * as fs from "fs";

function parseFileContents(fileContents: string) {
  const rootNode: Document = parse(fileContents, {
    sourceCodeLocationInfo: true,
  });

  validateElements(rootNode.childNodes[1] as Element);
}

function validateElements(node: Element): void {
  const childCount: number = node?.childNodes?.length ?? 0;

  if (childCount == 0) return;

  (node.childNodes as Element[]).forEach((e) => {
    validateImageAttributes(e);
    validateElements(e);
  });
}

for (const file of process.argv.slice(2)) {
  const fileContents: string = fs.readFileSync(file, "utf8");
  parseFileContents(fileContents);
}
