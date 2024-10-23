import React from "react";
import { Handle, useEdges } from "@xyflow/react";

const MachineNode = ({ data }) => {
  let outPerMin = 60 / data.time;
  let nIngredients = data.ingredients.length;
  let nOutputs = data.products.length;

  return (
    <div className="shadow-md rounded-lg bg-sf-dark border-4 border-sf-ficsit active:border-red-500 building-node hover:bg-sf-body">
      <div className="flex">
        <div className="border-r border-sf">
          <div className="flex flex-col h-full">
            {data.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex-grow items-center flex py-3 border-y border-sf px-2"
              >
                <img
                  src={`/sf-images/item-images/${ingredient.item.name}.png`}
                  alt=""
                  className="h-6 mr-2"
                />
                {ingredient.item.name} ({ingredient.amount})
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
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
        <div className="border-l border-sf">
          <div className="flex flex-col h-full">
            {data.products.map((product, index) => (
              <div
                key={index}
                className="flex-grow flex items-center py-3 border-y border-sf px-2"
              >
                {product.item.name} ({product.amount})
                <img
                  src={`/sf-images/item-images/${product.item.name}.png`}
                  alt=""
                  className="h-6 ml-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Input Handles */}
      {data.ingredients.map((ingredient, index) => (
        <Handle
          type="target"
          position="left"
          className="bg-sf border-sf-dark h-4 w-4"
          key={index}
          style={{ top: `${(1 / nIngredients) * (index + 0.5) * 100}%` }}
          id={`${data.id}-${ingredient.item.name}`}
        />
      ))}
      {/* Output Handles */}
      {data.products.map((product, index) => (
        <Handle
          type="source"
          position="right"
          className="bg-sf border-sf-dark h-4 w-4"
          key={index}
          style={{ top: `${(1 / nOutputs) * (index + 0.5) * 100}%` }}
          id={`${data.id}-${product.item.name}`}
        />
      ))}
    </div>
  );
};

export default MachineNode;
