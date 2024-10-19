// BuildingNode.jsx
import React from "react";
import { Handle } from "@xyflow/react";

const BuildingNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <h3 className="text-blue-500">{data.recipe.name || "Building"}</h3>
      <p>
        <strong>Inputs:</strong>
      </p>
      <ul>
        {data.recipe.inputResources.map((res, index) => (
          <li key={index}>
            {res.name} - {res.amount}
          </li>
        ))}
      </ul>
      <p>
        <strong>Outputs:</strong>
      </p>
      <ul>
        {data.recipe.outputResources.map((res, index) => (
          <li key={index}>
            {res.name} - {res.amount}
          </li>
        ))}
      </ul>
      {/* Input Handle */}
      <Handle type="target" position="left" />
      {/* Output Handle */}
      <Handle type="source" position="right" />
    </div>
  );
};

export default BuildingNode;
