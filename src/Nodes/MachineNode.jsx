import React from "react";
import { Handle } from "@xyflow/react";

const MachineNode = ({ data }) => {
  let outPerMin = 60 / data.time;
  return (
    <div className="px-4 py-2 shadow-md rounded-lg bg-sf-dark border-4 border-sf-ficsit active:border-red-500 building-node hover:bg-sf-body">
      <div className="flex">
        <div className="pr-2 mr-4 border-r border-sf">
          <h4 className="text-lg font-semibold">Inputs</h4>
          <ul className="p-2">
            {data.ingredients.map((ingredient, index) => (
              <li key={index} className="flex mb-1">
                <img
                  src={`/sf-images/item-images/${ingredient.item.name}.png`}
                  alt=""
                  className="h-6 mr-2"
                />
                {ingredient.item.name} ({ingredient.amount})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl text-sf mb-2">{data.name || "???????"}</h3>
          <div className="flex items-center">
            <img
              src={`/sf-images/building-images/${data.machine}.png`}
              alt=""
              className="h-10 mr-2"
            />
            {data.machine} &times; {data.multiplier}
          </div>
        </div>
      </div>
      {/* Input Handle */}
      <Handle
        type="target"
        position="left"
        className="bg-sf border-sf-dark h-4 w-4"
      />
      {/* Output Handle */}
      <Handle
        type="source"
        position="right"
        className="bg-sf border-sf-dark h-4 w-4"
      />
    </div>
  );
};

export default MachineNode;
