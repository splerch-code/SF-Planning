import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const LoadTodo = ({ setNodes, nodes }) => {
  const todoNode = { id: "0", type: "todoNode", position: { x: 100, y: 100 } };
  const HandleLoadTodo = () => {
    if (nodes.some((node) => node.id === "0")) {
      // remove todo node
      setNodes(nodes.filter((node) => node.id !== "0"));
    } else {
      // add todo node
      setNodes([...nodes, todoNode]);
    }
  };
  return (
    <div className="fixed bottom-4 left-4 z-20">
      <button onClick={HandleLoadTodo}>
        <FaQuestionCircle className="text-6xl text-blue-500 hover:text-blue-300 z-20" />
      </button>
    </div>
  );
};

export default LoadTodo;
