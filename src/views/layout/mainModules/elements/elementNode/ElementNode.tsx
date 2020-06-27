import React from "react";
import "./ElementNode.scss";
import {getNodeAttributes} from "@views/layout/mainModules/elements/utils";

/**
 * @author Weybn
 * @time 2020/6/27 22:00
 * @motto Rare in the World, you are worth it!
 */
export default function ElementNode(props: {
  node: any;
  indent: number;
}) {
  let {indent, node} = props;
  let attrArray = getNodeAttributes(node);

  return (
    <>
    </>
  );
}
