import { useState } from "react";

const EditMachine = ({ selectedNode, clearAllSelections, setNodes }) => {
  if (!selectedNode) {
    return null;
  }
  if (selectedNode.type != "machineNode") {
    return null;
  }

  const [multiplier, setMultiplier] = useState(selectedNode.data.multiplier);
  const [dummyMultiplier, setDummyMultiplier] = useState(multiplier);
  const perMinuteFactor = 60 / selectedNode.data.time;
  const [ingredientAmounts, setIngredientAmounts] = useState(
    selectedNode.data.ingredients.map(
      (ing) => ing.amount * multiplier * perMinuteFactor
    )
  );
  const [productAmounts, setProductAmounts] = useState(
    selectedNode.data.products.map(
      (prod) => prod.amount * multiplier * perMinuteFactor
    )
  );

  const handleMultiplierUpdate = (updatedMultiplier) => {
    setMultiplier(updatedMultiplier);
    setIngredientAmounts(
      selectedNode.data.ingredients.map(
        (ing) => ing.amount * updatedMultiplier * perMinuteFactor
      )
    );
    setProductAmounts(
      selectedNode.data.products.map(
        (prod) => prod.amount * updatedMultiplier * perMinuteFactor
      )
    );
    setDummyMultiplier(updatedMultiplier);
  };

  const handleUpdate = () => {
    let updatedNode = selectedNode;
    updatedNode.data.multiplier = multiplier;
    setNodes((ns) =>
      ns.map((node) => (node.id === updatedNode.id ? updatedNode : node))
    );
    clearAllSelections();
  };
  const handleDelete = () => {
    setNodes((ns) => ns.filter((node) => node.id !== selectedNode.id));
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
            <div className="mb-6 flex">
              <div className="p-2">
                <h4 className="text-lg font-semibold">Inputs</h4>
                {selectedNode.data.ingredients.map((ingredient, index) => (
                  <div className="my-2" key={ingredient.item.id || index}>
                    <label htmlFor="" className="mb-2 flex items-center">
                      <img
                        src={`/sf-images/item-images/${ingredient.item.name}.png`}
                        alt=""
                        className="h-6 mr-2"
                      />
                      {ingredient.item.name}
                    </label>
                    <input
                      type="number"
                      className="mt-1 w-20 p-2 border border-gray-300 bg-gray-800 rounded focus:ring-blue-500 focus:border focus:border-blue-500 mr-2"
                      value={ingredientAmounts[index]}
                      onChange={(e) => {
                        const newIngredients = ingredientAmounts.map(
                          (ing, i) => {
                            if (i === index)
                              return parseFloat(e.target.value || "0");
                            return ing;
                          }
                        );
                        setIngredientAmounts(newIngredients);
                      }}
                      onBlur={(e) => {
                        handleMultiplierUpdate(
                          parseFloat(e.target.value || "0") /
                            perMinuteFactor /
                            ingredient.amount
                        );
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="py-2 px-4 mx-2 border-x border-sf-ficsit">
                <h4 className="text-lg font-semibold">Machines Needed</h4>
                <div className="my-2">
                  <label htmlFor="" className="mb-2 flex items-center">
                    <img
                      src={`/sf-images/building-images/${selectedNode.data.machine}.png`}
                      alt=""
                      className="h-6 mr-2"
                    />
                    {selectedNode.data.machine}
                  </label>
                  <input
                    type="number"
                    className="mt-1 w-20 p-2 border border-gray-300 bg-gray-800 rounded focus:ring-blue-500 focus:border focus:border-blue-500"
                    value={dummyMultiplier}
                    onChange={(e) =>
                      setDummyMultiplier(parseFloat(e.target.value || "0"))
                    }
                    onBlur={(e) =>
                      handleMultiplierUpdate(parseFloat(e.target.value || "0"))
                    }
                    autoFocus
                  />
                </div>
              </div>

              <div className="p-2">
                <h4 className="text-lg font-semibold">Outputs</h4>
                {selectedNode.data.products.map((product, index) => (
                  <div className="my-2" key={product.item.id || index}>
                    <label htmlFor="" className="mb-2 flex items-center">
                      <img
                        src={`/sf-images/item-images/${product.item.name}.png`}
                        alt=""
                        className="h-6 mr-2"
                      />
                      {product.item.name}
                    </label>
                    <input
                      type="number"
                      className="mt-1 w-20 p-2 border border-gray-300 bg-gray-800 rounded focus:ring-blue-500 focus:border focus:border-blue-500 mr-2"
                      value={productAmounts[index]}
                      onChange={(e) => {
                        const newProducts = productAmounts.map((prod, i) => {
                          if (i === index)
                            return parseFloat(e.target.value || "0");
                          return prod;
                        });
                        setProductAmounts(newProducts);
                      }}
                      onBlur={(e) => {
                        handleMultiplierUpdate(
                          parseFloat(e.target.value || "0") /
                            perMinuteFactor /
                            product.amount
                        );
                      }}
                    />
                  </div>
                ))}
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
                Delete Machine
              </button>
              <button
                className="flex-1 bg-sf-ficsit-dark text-sf-ficsit rounded py-2 mx-2 font-bold hover:bg-opacity-50"
                onClick={handleUpdate}
              >
                Update Machine
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMachine;
