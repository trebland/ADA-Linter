import { parse } from "parse5";
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
  const rootNode = parse(fileContents, {
    sourceCodeLocationInfo: true,
  });

  validateElements(rootNode.childNodes[1]);
}

function validateElements(node: any): void {
  const childCount: number = node?.childNodes?.length ?? 0;

  if (childCount == 0) return;

  node.childNodes.forEach((e: any) => {
    validateImageAttributes(e);
    validateElements(e);
  });
}
