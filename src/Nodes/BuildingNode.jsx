// BuildingNode.jsx
import React from "react";
import { Handle } from "@xyflow/react";

const BuildingNode = ({ data }) => {
  let recipe = data;
  return (
    <div className="px-4 py-2 shadow-md rounded-sm bg-sf-dark border-2 border-sf">
      <div className="flex">
        <div className="pr-2 mr-4 border-r border-sf">
          <h4 className="text-lg font-semibold">Inputs</h4>
          <ul className="p-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex mb-1">
                <img
                  src={`/sf-images/item-images/${ingredient.item.name}.png`}
                  alt=""
                  className="h-6 mr-2"
                />
                {ingredient.item.name} - {ingredient.amount}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl text-sf mb-2">{recipe.name || "???????"}</h3>
          <div className="flex items-center">
            <img
              src={`/sf-images/building-images/${recipe.machine}.png`}
              alt=""
              className="h-10 mr-2"
            />
            {recipe.machine} (1)
          </div>
        </div>
      </div>
      {/* Input Handle */}
      <Handle type="target" position="left" />
      {/* Output Handle */}
      <Handle type="source" position="right" />
    </div>
  );
};

export default BuildingNode;
