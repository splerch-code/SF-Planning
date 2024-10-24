import React from "react";
import AddMachineForm from "./AddMachineForm";
import AddResourceForm from "./AddResourceForm";
import SaveFlow from "./SaveFlow";

const Header = ({ addMachine, addResource, sfData, nodes, edges }) => {
  return (
    <header className="bg-black py-4 bg-sf-dark px-6 px-auto flex items-center z-10 border-b border-sf-ficsit">
      <div className="flex-none text-xl text-sf mr-4">Satisfactory Planner</div>
      <div className="flex-none">
        <AddResourceForm addResource={addResource} sfData={sfData} />
        <AddMachineForm addMachine={addMachine} sfData={sfData} />
      </div>
      <div className="flex-grow"></div>
      <SaveFlow nodes={nodes} edges={edges} />
    </header>
  );
};

export default Header;
