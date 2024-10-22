import React, { useState } from "react";
import Resource from "./Resource";

const AddResourceForm = ({ addResource, sfData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const togglePopover = () => {
    setIsOpen(!isOpen);
    setSearch("");
  };

  const items = { ...sfData.items, ...sfData.resources };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={togglePopover}
        className="px-4 py-2 bg-black text-sf border border-sf rounded hover:bg-sf hover:text-black mx-2"
      >
        Add Resource Node
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 text-white">
          <div className="relative  z-20 mt-2 p-4 bg-gray-800 rounded shadow-lg border border-gray-200">
            <div className="flex items-top mb-4">
              <h3 className="text-xl flex-1 text-sf">Add Resource</h3>
              <button
                onClick={togglePopover}
                className="text-sf hover:text-yellow-500 text-xl"
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 bg-gray-900 rounded focus:ring-blue-500 focus:border focus:border-blue-500 mb-4"
              placeholder="search items"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="w-80 border border-sf bg-gray-900 p-6 rounded mb-4 h-72 overflow-y-auto">
              {Object.keys(items).map(function (key, index) {
                return (
                  <Resource
                    key={key}
                    item={items[key]}
                    addResource={addResource}
                    togglePopover={togglePopover}
                    search={search}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddResourceForm;
