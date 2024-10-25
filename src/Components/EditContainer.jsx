import { useState } from "react";

const EditContainer = ({
  selectedNode,
  clearAllSelections,
  setNodes,
  setEdges,
  edges,
}) => {
  if (!selectedNode) {
    return null;
  }
  if (selectedNode.type != "containerNode") {
    return null;
  }

  const [amount, setAmount] = useState(selectedNode.data.amount);
  const inputEdges = edges.filter((edge) => edge.target === selectedNode.id);
  const outputEdges = edges.filter((edge) => edge.source === selectedNode.id);
  const allConnectedEdges = [...inputEdges, ...outputEdges];
  const resource =
    allConnectedEdges.length > 0 ? allConnectedEdges[0].data.name : "Empty";

  const handleDelete = () => {
    setNodes((ns) => ns.filter((node) => node.id !== selectedNode.id));
    setEdges((es) =>
      es.filter(
        (edge) =>
          edge.source !== selectedNode.id && edge.target !== selectedNode.id
      )
    );
    clearAllSelections();
  };
  const handleUpdate = () => {};
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
        <div className="relative bg-sf-dark border-2 border-gray-300  rounded-lg shadow-lg text-white min-w-96">
          <h2 className="text-xl font-semibold p-4 bg-sf-ficsit-dark rounded-t-lg flex items-center">
            <img
              src={`sf-images/item-images/${resource}.png`}
              alt=""
              className="h-8 mr-2 flex-none"
            />
            <span className="flex-1">{resource} Container</span>
            <button
              className="ml-auto hover:text-black text-2xl"
              onClick={clearAllSelections}
            >
              &times;
            </button>
          </h2>
          <div className="p-6">
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
                Delete Container
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditContainer;
