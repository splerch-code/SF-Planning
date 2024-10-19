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

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  resourceNode: ResourceNode,
  buildingNode: BuildingNode,
};

const initialNodes = [
  {
    id: "1",
    type: "resourceNode",
    data: { resource: { name: "Iron Ore", amount: 100 } },
    position: { x: 100, y: 100 },
  },
  {
    id: "2",
    type: "buildingNode",
    data: {
      recipe: {
        inputResources: [
          { name: "Iron Ore", amount: 50 },
          { name: "Coal", amount: 10 },
        ],
        outputResources: [{ name: "Iron Ingot", amount: 20 }],
      },
    },
    position: { x: 400, y: 100 },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addBuilding = () => {
    const newBuildingId = `${nodes.length + 1}`;
    setNodes((ns) => [
      ...ns,
      {
        id: newBuildingId,
        type: "buildingNode",
        data: {
          recipe: {
            inputResources: [],
            outputResources: [],
          },
        },
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
        color: "black",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <button onClick={addBuilding} className="p-2 rounded border">
        Add Building
      </button>
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
