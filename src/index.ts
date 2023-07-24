import { parse } from "parse5";
import {
  Document,
  Element,
} from "../node_modules/parse5/dist/tree-adapters/default.js";
import { validateImageAttributes } from "./validators/image.js";
import { readFileSync, accessSync, constants } from "fs";

export function runValidation(files: string[]) {
  console.log(files);

  files.forEach((file) => {
    try {
      accessSync(file, constants.F_OK);
    } catch (err) {
      console.log(err);
    }

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
  validateImageAttributes(node);

  (node.childNodes as Element[]).forEach((e) => validateElements(e));
}
