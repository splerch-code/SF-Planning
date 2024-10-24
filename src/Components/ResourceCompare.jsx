import React from "react";

const ResourceCompare = ({ nItems, nTarget, isOutput }) => {
  const round = (num) => Math.round(num * 1000) / 1000;
  let colorClass = null;
  if (round(nItems) == round(nTarget)) {
    colorClass = "text-white";
  } else if (round(nItems) > round(nTarget)) {
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
      {round(nItems)}/{round(nTarget)}
    </span>
  );
};

export default ResourceCompare;
