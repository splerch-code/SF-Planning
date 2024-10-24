import { useState } from "react";
import { useNodes, useEdges } from "@xyflow/react";

const SaveFlow = ({ currentFlow = "", nodes, edges }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [saveName, setSaveName] = useState(currentFlow);

  const handleSave = () => {
    if (!saveName) {
      alert("Please enter a save name");
      return;
    }
    const fileData = JSON.stringify({
      nodes: nodes,
      edges: edges,
    });
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${saveName}.json`;
    link.click();
  };
  return (
    <>
      {/* button to open save modal */}
      <button
        className="px-4 py-2 bg-black text-sf border border-sf rounded hover:bg-sf hover:text-black mx-2 inline-block"
        onClick={() => setIsVisible(!isVisible)}
      >
        Save Flow
      </button>

      {/* modal */}
      {isVisible && (
        <div className="fixed inset-0 z-0 flex items-center justify-center">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-sf-dark bg-opacity-50"
            onClick={() => setIsVisible(false)}
          ></div>
          <div className="relative bg-sf-dark border-2 border-green-700 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold p-4 bg-green-700 rounded-t-lg flex items center">
              <span className="flex-1 pr-8">Save Current Flow</span>
              <button
                onClick={() => setIsVisible(false)}
                className="hover:text-green-500 text-xl"
              >
                &times;
              </button>
            </h2>
            <div className="p-4">
              <input
                type="text"
                className="mt-1 w-full p-2 border border-gray-300 bg-gray-800 rounded focus:ring-blue-500 focus:border focus:border-blue-500 mr-2 mb-4"
                placeholder="Save Name"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                autoFocus
              />
              <button
                className="p-2 w-full bg-sf-ficsit hover:bg-orange-600 rounded-lg text-center font-bold"
                onClick={handleSave}
              >
                Save flow
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveFlow;
