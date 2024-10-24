import React from "react";

const Resource = ({ item, search, addResource, togglePopover, index }) => {
  if (
    search &&
    search.length > 0 &&
    !item.name.toLowerCase().includes(search.toLowerCase())
  ) {
    return null;
  }
  const onSelectResource = (e) => {
    e.preventDefault();
    let resourceNodeData = {
      name: item.name,
      amount: 1,
      energy: item.energy,
      sinkPoints: item.points,
      hasSource: false,
    };
    addResource(resourceNodeData);
    togglePopover();
  };
  return (
    <div
      className="my-2 w-full p-2 border border-sf rounded flex gap-2 bg-sf-dark cursor-pointer hover:bg-gray-800 items-center"
      onClick={onSelectResource}
      tabIndex={index + 2}
    >
      <div className="mr-2">
        <img
          src={`/sf-images/item-images/${item.name}.png`}
          alt={item.name}
          className="h-12 w-12"
        />
      </div>
      <div className="text-lg">{item.name}</div>
    </div>
  );
};

export default Resource;
