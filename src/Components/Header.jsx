import React from "react";
import AddMachineForm from "./AddMachineForm";
import AddResourceForm from "./AddResourceForm";

const Header = ({ addMachine, addResource, sfData }) => {
  return (
    <header className="bg-black py-4 bg-sf-dark px-6 px-auto flex items-center z-10">
      <div className="flex-none text-xl text-sf mr-4">Satisfactory Planner</div>
      <div className="flex-none">
        <AddResourceForm addResource={addResource} sfData={sfData} />
        <AddMachineForm addMachine={addMachine} sfData={sfData} />
      </div>
    </header>
  );
};

export default Header;
