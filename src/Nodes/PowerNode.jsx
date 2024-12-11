import { Handle, useEdges, useNodes } from "@xyflow/react";
import React from "react";

const PowerNode = () => {
  const inputEdges = useEdges().filter((edge) => edge.target === data.id);
  const outputEdges = useEdges().filter((edge) => edge.source === data.id);
  const totalInput = inputEdges.reduce(
    (sum, edge) => sum + edge.data.amount,
    0
  );
  const totalOutput = outputEdges.reduce(
    (sum, edge) => sum + edge.data.amount,
    0
  );
  const allConnectedEdges = [...inputEdges, ...outputEdges];
  const resource =
    allConnectedEdges.length > 0 ? allConnectedEdges[0].data.name : "Empty";
  return (
    <div className="p-4 shadow-md rounded bg-sf-dark border-4 border-gray-300 machine-node">
      <div className="text-center text-lg">
        {resource === "Empty" ? (
          <div>Empty Container</div>
        ) : (
          <div className="flex flex-col">
            <div className="mb-3">{resource}</div>
            <div className="flex items-center">
              <div className="flex-grow"></div>
              <span className="font-bold text-green-500 mx-2">
                {totalInput}
              </span>
              <img
                src={`sf-images/item-images/${resource}.png`}
                className="h-8 mx-2"
              />
              <div className="flex-grow"></div>
            </div>
          </div>
        )}
      </div>
      <Handle
        type="target"
        position="left"
        className="bg-sf border-sf-dark h-4 w-4"
        id={`${data.id}-Container`}
        style={{ top: "65%" }}
      />
    </div>
  );
};

export default PowerNode;
