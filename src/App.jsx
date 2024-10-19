import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import ResourceNode from "./Nodes/ResourceNode";
import BuildingNode from "./Nodes/BuildingNode";
import Header from "./Components/Header";
import AddBuildingForm from "./Components/AddBuildingForm";
import sfData from "./data/sf-data.json";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  resourceNode: ResourceNode,
  buildingNode: BuildingNode,
};

const initialNodes = [];

const initialEdges = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addBuilding = (recipe) => {
    const newBuildingId = `${nodes.length + 1}`;
    setNodes((ns) => [
      ...ns,
      {
        id: newBuildingId,
        type: "buildingNode",
        data: recipe,
        position: { x: 200, y: 200 },
      },
    ]);
  };

  const addResource = () => {
    const newResourceId = `${nodes.length + 1}`;
    setNodes((ns) => [
      ...ns,
      {
        id: newResourceId,
        type: "resourceNode",
        data: { resource: { name: "New Resource", amount: 0 } },
        position: { x: 300, y: 300 },
      },
    ]);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        color: "white",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
      className="bg-sf-body"
    >
      <Header addBuilding={addBuilding} sfData={sfData} />

      <button onClick={addResource} className="p-2 rounded border">
        Add Resource
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
