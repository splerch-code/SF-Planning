import React from "react";

const Machine = ({
  recipe,
  items,
  resources,
  machines,
  addMachine,
  togglePopover,
  ingredientSearch,
  recipeSearch,
  productSearch,
}) => {
  const mergedItems = { ...items, ...resources };
  let machine = recipe.machine;
  if (Object.keys(machines).includes(machine)) {
    machine = machines[machine].name;
  }
  const ingredientNames = recipe.ingredients
    .map((ingredient) =>
      mergedItems[ingredient.item] ? mergedItems[ingredient.item].name : ""
    )
    .join(", ");
  const productNames = recipe.products
    .map((product) =>
      mergedItems[product.item] ? mergedItems[product.item].name : ""
    )
    .join(", ");
  if (
    ingredientSearch &&
    ingredientSearch.length > 0 &&
    !ingredientNames.toLowerCase().includes(ingredientSearch.toLowerCase())
  ) {
    return null; // Return null if the recipe doesn't match the search criteria
  }
  if (
    recipeSearch &&
    recipeSearch.length > 0 &&
    !recipe.name.toLowerCase().includes(recipeSearch.toLowerCase())
  ) {
    return null; // Return null if the recipe doesn't match the search criteria
  }
  if (
    productSearch &&
    productSearch.length > 0 &&
    !productNames.toLowerCase().includes(productSearch.toLowerCase())
  ) {
    return null; // Return null if the recipe doesn't match the search criteria
  }

  // function to handle recipe selection
  // closes the popover menu and adds the selected recipe to the graph
  const onSelectRecipe = (e) => {
    e.preventDefault();
    let recipeNodeData = {
      name: recipe.name,
      machine: machine,
      ingredients: recipe.ingredients.map((ingredient) => ({
        item: mergedItems[ingredient.item],
        amount: ingredient.amount,
        supply: 0,
      })),
      products: recipe.products.map((product) => ({
        item: mergedItems[product.item],
        amount: product.amount,
      })),
      time: recipe.time,
      powerUse: recipe.power_use,
    };
    addMachine(recipeNodeData);
    togglePopover();
  };

  return (
    <div
      className="my-2 w-full p-2 border border-sf rounded grid grid-cols-3 gap-2 bg-sf-dark cursor-pointer hover:bg-gray-800"
      onClick={onSelectRecipe}
    >
      <div>
        {recipe.ingredients.map((ingredient, index) => {
          if (Object.keys(mergedItems).includes(ingredient.item)) {
            let item = mergedItems[ingredient.item];
            return (
              <div
                key={index}
                className="flex items-center border-b border-gray-500 text-sm py-1"
              >
                <img
                  src={`/sf-images/item-images/${item.name}.png`}
                  alt=""
                  className="h-4 mr-1"
                />
                {item.name} ({ingredient.amount})
              </div>
            );
          }
          return null; // Return null if the item doesn't exist to avoid any issues
        })}
      </div>
      <div className="text-center font-bold rounded bg-sf-dark border border-gray-500 px-2">
        {recipe.name}
        <div className="flex font-normal items-center">
          <div className="flex-1"></div>
          <div className="flex-none">
            <img
              src={`/sf-images/machine-images/${machine}.png`}
              alt=""
              className="h-4 mr-1"
            />
          </div>
          <div className="flex-none">{machine}</div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="text-right">
        {recipe.products.map((product, index) => {
          if (Object.keys(mergedItems).includes(product.item)) {
            let item = mergedItems[product.item];
            return (
              <div
                key={index}
                className="flex items-center border-b border-gray-500 text-sm py-1"
              >
                <div className="flex-1"></div>
                <img
                  src={`/sf-images/item-images/${item.name}.png`}
                  alt=""
                  className="h-4 mr-1"
                />
                {item.name} ({product.amount})
              </div>
            );
          }
          return null; // Return null if the item doesn't exist to avoid any issues
        })}
      </div>
    </div>
  );
};

export default Machine;
