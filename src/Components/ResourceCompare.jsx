import React from "react";

const ResourceCompare = ({ nItems, nTarget, isOutput }) => {
  let colorClass = null;
  if (nItems == nTarget) {
    colorClass = "text-white";
  } else if (nItems > nTarget) {
    if (isOutput) {
      colorClass = "text-red-500";
    } else {
      colorClass = "text-green-500";
    }
  } else {
    if (!isOutput) {
      colorClass = "text-red-500";
    } else {
      colorClass = "text-green-500";
    }
  }

  return (
    <span className={colorClass}>
      {nItems}/{nTarget}
    </span>
  );
};

export default ResourceCompare;
