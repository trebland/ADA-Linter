import { TAG_NAMES } from "../enums/tags.js";
import { Element } from "../../node_modules/parse5/dist/tree-adapters/default.js";

const enum IMAGE_ATTRIBUTES {
  alt = "alt",
}

export function validateImageAttributes(node: Element) {
  if (node.tagName !== TAG_NAMES.IMG) return;

  if (!node.attrs.find((e) => e.name === IMAGE_ATTRIBUTES.alt) ?? true) {
    console.log("Violation at line: ", node.sourceCodeLocation?.startLine);
    console.log("Reason: Images require an alt attribute");
  }
}
