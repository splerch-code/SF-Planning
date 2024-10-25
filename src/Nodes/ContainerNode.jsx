import { Handle, useEdges, useNodes } from "@xyflow/react";
import ResourceCompare from "../Components/ResourceCompare";
import { CgEnter } from "react-icons/cg";

const ContainerNode = ({ data }) => {
  const inputEdges = useEdges().filter((edge) => edge.target === data.id);
  const outputEdges = useEdges().filter((edge) => edge.source === data.id);
  const allConnectedEdges = [...inputEdges, ...outputEdges];
  const resource = allConnectedEdges ? allConnectedEdges[0].data.name : "empty";
  return (
    <div className="p-4 shadow-md rounded bg-sf-dark border-4 border-gray-300">
      {resource === "empty" ? <div> </div> : <></>}
    </div>
  );
};
