import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const EditInput = ({
  selectedEdge,
  nodes,
  edges,
  setEdges,
  clearAllSelections,
}) => {
  if (!selectedEdge) {
    return null;
  }
  if (selectedEdge.type != "inputEdge") {
    return null;
  }
  const sourceNode = nodes.find((n) => n.id === selectedEdge.source);
  const targetNode = nodes.find((n) => n.id === selectedEdge.target);

  const [amount, setAmount] = useState(selectedEdge.data.amount || 0);

  const handleUpdate = () => {
    let updatedEdge = selectedEdge;
    updatedEdge.data.amount = amount;
    setEdges((es) =>
      es.map((edge) => (edge.id === selectedEdge.id ? updatedEdge : edge))
    );
    clearAllSelections();
  };
  const handleDelete = () => {
    setEdges(edges.filter((e) => e.id !== selectedEdge.id));
    clearAllSelections();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bf-sf-dark bg-opacity-50"
          onClick={clearAllSelections}
        ></div>
        <div className="relative bg-sf-dark border-2 border-sf rounded-lg shadow-lg text-white">
          <h2 className="text-lg font-semibold p-4 bg-sf-ficsit-dark rounded-t-lg flex items-center">
            <img
              src={`sf-images/item-images/${sourceNode.data.name}.png`}
              alt=""
              className="h-8 mr-2 flex-none"
            />
            <span className="flex-none">{sourceNode.data.name}</span>
            <img
              src={`sf-images/building-images/${targetNode.data.machine}.png`}
              className="h-8 mx-2 flex-2"
            />
            <span className="flex-none">{targetNode.data.name}</span>
            <button
              className="ml-auto hover:text-black text-2xl"
              onClick={clearAllSelections}
            >
              &times;
            </button>
          </h2>
          <div className="p-6">
            <div className="mb-6">
              <input
                type="range"
                className={`w-96 ${
                  parseFloat(amount) > sourceNode.data.amount
                    ? "accent-red-500"
                    : "accent-sf"
                } mx-1`}
                min={0}
                max={sourceNode.data.amount}
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
                step={0.0001}
              />
              <div className="flex items-center">
                <input
                  type="number"
                  min={0}
                  className="mt-1 w-24 p-2 border border-gray-300 bg-gray-800 rounded focus:ring-blue-500 focus:border focus:border-blue-500 mr-2 mx-1"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
                />
                <span className="flex-none">/ {sourceNode.data.amount}</span>
                <div className="flex-grow"></div>
                <input
                  type="number"
                  min={0}
                  className="mt-1 w-24 p-2 border border-gray-300 bg-gray-800 rounded focus:ring-blue-500 focus:border focus:border-blue-500 mr-2 mx-1"
                  value={(amount / sourceNode.data.amount) * 100}
                  onChange={(e) =>
                    setAmount(
                      (parseFloat(e.target.value || "0") *
                        sourceNode.data.amount) /
                        100
                    )
                  }
                />
                <span className="flex-none">%</span>
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
                Delete Line
              </button>
              <button
                className="flex-1 bg-sf-ficsit-dark text-sf-ficsit rounded py-2 mx-2 font-bold hover:bg-opacity-50"
                onClick={handleUpdate}
              >
                Update Line
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInput;
