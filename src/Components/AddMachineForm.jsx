import React, { useState } from "react";
import Machine from "./Machine";

const AddMachineForm = ({ addMachine, sfData }) => {
  // State to manage popover visibility
  const [isOpen, setIsOpen] = useState(false);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [recipeSearch, setRecipeSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");

  const recipes = sfData.recipes;
  const items = sfData.items;
  const resources = sfData.resources;
  const machines = sfData.machines;

  // Toggle popover function
  const togglePopover = (clearSearch = false) => {
    setIsOpen(!isOpen);
    if (clearSearch) {
      setIngredientSearch("");
      setRecipeSearch("");
      setProductSearch("");
    }
  };
  const executeAddMachine = () => {
    setIsOpen(false);
    addMachine();
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to toggle the popover */}
      <button
        onClick={togglePopover}
        className="px-4 py-2 bg-black text-sf border border-sf rounded hover:bg-sf hover:text-black mx-2"
      >
        Add Machine Node
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 text-white">
          <div className="relative  z-20 mt-2 p-4 bg-gray-800 rounded shadow-lg border border-gray-200">
            <div className="flex items-top mb-2">
              <h3 className="text-xl flex-1 text-sf">Add Recipe</h3>
              <button
                onClick={togglePopover}
                className="text-sf hover:text-yellow-500 text-xl"
              >
                &times;
              </button>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4 w-[600px]">
              <div>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 bg-gray-900 rounded focus:ring-blue-500 focus:border focus:border-blue-500"
                  placeholder="Search ingredients"
                  onChange={(e) => setIngredientSearch(e.target.value)}
                  value={ingredientSearch}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 bg-gray-900 rounded focus:ring-blue-500 focus:border focus:border-blue-500"
                  placeholder="Search recipes"
                  onChange={(e) => setRecipeSearch(e.target.value)}
                  value={recipeSearch}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 bg-gray-900 rounded focus:ring-blue-500 focus:border focus:border-blue-500"
                  placeholder="Search products"
                  onChange={(e) => setProductSearch(e.target.value)}
                  value={productSearch}
                />
              </div>
            </div>
            <div className="w-[600px] max-h-96 bg-gray-900 rounded border border-sf mb-4 p-6 overflow-y-scroll">
              {Object.keys(recipes).map(function (key, index) {
                return (
                  <Machine
                    key={key}
                    recipe={recipes[key]}
                    items={items}
                    resources={resources}
                    machines={machines}
                    addMachine={addMachine}
                    togglePopover={togglePopover}
                    ingredientSearch={ingredientSearch}
                    recipeSearch={recipeSearch}
                    productSearch={productSearch}
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

export default AddMachineForm;
