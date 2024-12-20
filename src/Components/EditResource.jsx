import { useState } from "react";

const EditResource = ({
  selectedNode,
  clearAllSelections,
  setNodes,
  setEdges,
  edges,
}) => {
  if (!selectedNode) {
    return null;
  }
  if (selectedNode.type != "resourceNode") {
    return null;
  }

  const [amount, setAmount] = useState(selectedNode.data.amount);

  const handleUpdate = () => {
    if (amount < 0) {
      alert("Amount must be a positive number.");
      return;
    }
    const updatedNode = selectedNode;
    updatedNode.data.amount = amount;
    setNodes((ns) =>
      ns.map((node) => (node.id === selectedNode.id ? updatedNode : node))
    );
    clearAllSelections();
  };

  const handleDelete = () => {
    setNodes((ns) => ns.filter((node) => node.id !== selectedNode.id));
    setEdges((es) => es.filter((edge) => edge.source !== selectedNode.id));
    clearAllSelections();
  };

  return (
    <>
      {/* Wrapper for overlay and modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-sf-dark bg-opacity-50"
          onClick={clearAllSelections}
        ></div>

        {/* Modal */}
        <div className="relative bg-sf-dark border-2 border-sf  rounded-lg shadow-lg text-white min-w-96">
          <h2 className="text-xl font-semibold p-4 bg-sf-ficsit-dark rounded-t-lg flex items-center">
            <img
              src={`sf-images/item-images/${selectedNode.data.name}.png`}
              alt=""
              className="h-8 mr-2 flex-none"
            />
            <span className="flex-1">{selectedNode.data.name}</span>
            <button
              className="ml-auto hover:text-black text-2xl"
              onClick={clearAllSelections}
            >
              &times;
            </button>
          </h2>
          <div className="p-6">
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-bold flex-1 text-lg mb-2">
                    Output Amount
                  </label>
                  <div className="flex items-end">
                    <input
                      type="number"
                      className="mt-1 w-20 p-2 border border-gray-300 bg-gray-800 rounded focus:ring-blue-500 focus:border focus:border-blue-500 mr-2"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                      min={0}
                      autoFocus
                    />
                    <span className="text-lg">{0} Used</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex-1 mb-2 font-bold text-lg">
                    Destinations (under construction)
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                className="text-sf-ficsit-dark border font-bold border-sf-ficsit-dark w-full py-2 mx-2 rounded hover:bg-sf-ficsit-dark hover:text-black flex-1"
                onClick={clearAllSelections}
              >
                Cancel
              </button>
              <button
                className="flex-1  text-red-500 border-2 border-red-500 rounded py-2 mx-2 font-bold hover:bg-red-500 hover:text-white"
                onClick={handleDelete}
              >
                Delete Resource
              </button>
              <button
                className="flex-1 bg-sf-ficsit-dark text-sf-ficsit rounded py-2 mx-2 font-bold hover:bg-opacity-50"
                onClick={handleUpdate}
              >
                Update Resource
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditResource;
