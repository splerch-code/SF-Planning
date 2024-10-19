import React, { useState } from "react";
import Recipe from "./Recipe";

const AddBuildingForm = ({ addBuilding, sfData }) => {
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
  const togglePopover = () => {
    setIsOpen(!isOpen);
  };
  const executeAddBuilding = () => {
    setIsOpen(false);
    addBuilding();
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to toggle the popover */}
      <button
        onClick={togglePopover}
        className="px-4 py-2 bg-black text-sf border border-sf rounded hover:bg-sf hover:text-black mx-2"
      >
        Add Recipe Node
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute z-20 mt-2 p-4 bg-gray-800 rounded shadow-lg border border-gray-200">
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 bg-gray-900 rounded focus:ring-blue-500 focus:border focus:border-blue-500"
                placeholder="Search ingredients"
                onChange={(e) => setIngredientSearch(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 bg-gray-900 rounded focus:ring-blue-500 focus:border focus:border-blue-500"
                placeholder="Search recipes"
                onChange={(e) => setRecipeSearch(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 bg-gray-900 rounded focus:ring-blue-500 focus:border focus:border-blue-500"
                placeholder="Search products"
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="w-[600px] max-h-96 bg-gray-900 rounded border border-sf mb-4 p-6 overflow-y-scroll">
            {Object.keys(recipes).map(function (key, index) {
              return (
                <Recipe
                  key={key}
                  recipe={recipes[key]}
                  items={items}
                  resources={resources}
                  machines={machines}
                  addBuilding={addBuilding}
                  togglePopover={togglePopover}
                  ingredientSearch={ingredientSearch}
                  recipeSearch={recipeSearch}
                  productSearch={productSearch}
                />
              );
            })}
          </div>
          <button
            onClick={executeAddBuilding}
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBuildingForm;
