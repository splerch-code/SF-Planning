import { Handle } from "@xyflow/react";


const ResourceNode = ({ data }) => {
  const imagePath = `/sf-images/item-images/${data.resource.name}.png`;
  return (
    <div>
      <div className="px-4 py-4 shadow-md rounded-full bg-sf-dark border-2 border-gray-700">
        <div className="text-bold flex">

          <img src={imagePath} className="h-6 pr-2" />
          {data.resource.name}
        </div>
        <p>Amount: {data.resource.amount}</p>
        {/* Output Handle */}
        <Handle type="source" position="right" />
      </div>
    </div>
  );
};

export default ResourceNode;
