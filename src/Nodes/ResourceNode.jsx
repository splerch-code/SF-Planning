import { Handle, useEdges, useNodes } from "@xyflow/react";

const ResourceNode = ({ data }) => {
  const borderClass = data.hasSource ? "border-sf-ficsit-dark" : "border-sf";
  const imagePath = `/sf-images/item-images/${data.name}.png`;
  const outputEdges =
    useEdges().filter((edge) => edge.source === data.id) || [];
  const amountUsed = outputEdges.reduce(
    (sum, edge) => sum + edge.data.amount,
    0
  );

  return (
    <div
      className={`px-4 py-4 shadow-md rounded-full bg-sf-dark border-4 ${borderClass} resource-node active:border-red-500 hover:bg-sf-body cursor-pointer`}
    >
      <img src={imagePath} className="h-8 mx-auto" />
      <div className="font-bold text-center">
        {data.name}
        <div
          className={
            amountUsed > data.amount
              ? "text-red-500"
              : amountUsed < data.amount
              ? "text-green-500"
              : "text-white"
          }
        >
          {amountUsed}/<span className="font-bold">{data.amount}</span>
        </div>
      </div>
      {data.hasSource && (
        <Handle
          type="target"
          position="left"
          className="bg-sf border-sf-dark h-4 w-4"
          id={`${data.id}-${data.name}`}
        />
      )}
      <Handle
        type="source"
        position="right"
        className="bg-sf border-sf-dark h-4 w-4"
        id={`${data.id}-${data.name}`}
      />
    </div>
  );
};

export default ResourceNode;
