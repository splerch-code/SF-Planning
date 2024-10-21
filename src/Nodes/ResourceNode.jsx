import { Handle } from "@xyflow/react";

const ResourceNode = ({ data }) => {
  const imagePath = `/sf-images/item-images/${data.name}.png`;
  return (
    <div>
      <div className="px-4 py-4 shadow-md rounded-full bg-sf-dark border-2 border-gray-700">
        <div className="text-bold flex">
          <img src={imagePath} className="h-6 pr-2" />
          {data.name} ({data.amount})
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
    </div>
  );
};

export default ResourceNode;
