import { Handle } from "@xyflow/react";

const ResourceNode = ({ data }) => {
  const imagePath = `/sf-images/item-images/${data.name}.png`;
  return (
    <div className="px-4 py-4 shadow-md rounded-full bg-sf-dark border-4 border-sf resource-node active:border-red-500 hover:bg-sf-body">
      <img src={imagePath} className="h-8 mx-auto" />
      <div className="font-bold text-center">
        {data.name}
        <br />({data.amount})
      </div>
      {/* Source Handle */}
      {data.hasSource && (
        <Handle
          type="target"
          position="left"
          className="bg-sf border-sf-dark h-4 w-4"
        />
      )}
      {/* Target Handle */}
      <Handle
        type="source"
        position="right"
        className="bg-sf border-sf-dark h-4 w-4"
      />
    </div>
  );
};

export default ResourceNode;
