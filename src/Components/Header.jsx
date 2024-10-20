import React from "react";
import AddBuildingForm from "./AddBuildingForm";
import AddResourceForm from "./AddResourceForm";

const Header = ({ addBuilding, addResource, sfData }) => {
  return (
    <div className="w-screen bg-black py-6 bg-sf-dark px-6 container mx-auto flex items-center absolute top-0 left-0 z-10">
      <div className="flex-none text-xl text-sf mr-4">Satisfactory Planner</div>
      <div className="flex-none">
        <AddResourceForm addResource={addResource} sfData={sfData} />
        <AddBuildingForm addBuilding={addBuilding} sfData={sfData} />
      </div>
    </div>
  );
};

export default Header;
