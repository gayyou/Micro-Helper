export const getNodeAttributes = (node: any) => {
  let attributeNames: Array<string> = node.getAttributeNames();
  let attrArray = [];

  for (let name of attributeNames) {
    attrArray.push({
      key: name,
      value: node.getAttribute(name)
    });
  }

  return attrArray;
}
