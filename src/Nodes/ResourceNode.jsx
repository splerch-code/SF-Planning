import React from "react";

import { Handle } from "@xyflow/react";

const ResourceNode = ({ data }) => {
  return (
    <div>
      <div className="resource-node">
        <h3>{data.resource.name}</h3>
        <p>Amount: {data.resource.amount}</p>
        {/* Output Handle */}
        <Handle type="source" position="right" />
      </div>
    </div>
  );
};

export default ResourceNode;
