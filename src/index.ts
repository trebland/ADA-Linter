import { parse } from "parse5";
import { Document, Element } from "parse5/dist/tree-adapters/default";
import { validateImageAttributes } from "./validators/image";
import { readFileSync } from "fs";

export function runValidation(files: string[]) {
  files.forEach((file) => {
    const fileContents: string = readFileSync(file, "utf8");

    validateFileContents(fileContents);
  });
}

function validateFileContents(fileContents: string) {
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
