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
    const maxNodeX = Math.max(...nodes.map((n) => n.position.x), 0);
    const newBuildingNode = {
      id: newBuildingId,
      type: "buildingNode",
      data: recipe,
      position: { x: maxNodeX + 400, y: 200 },
    };
    const firstY = 200;
    const newResourceNodes = recipe.products.map((product, index) => ({
      id: `${newBuildingId}-${index + 1}`,
      type: "resourceNode",
      data: {
        name: product.item.name,
        amount: product.amount,
        energy: product.item.energy,
        sinkPoints: product.item.points,
        hasSource: true,
      },
      position: { x: maxNodeX + 900, y: firstY + index * 100 },
    }));
    const newEdges = newResourceNodes.map((product) => ({
      id: `${newBuildingId}->${product.id}`,
      source: newBuildingId,
      target: product.id,
    }));

    setNodes((ns) => [...ns, newBuildingNode, ...newResourceNodes]);
    setEdges((es) => [...es, ...newEdges]);
  };

  const addResource = (resource) => {
    const newResourceId = `${nodes.length + 1}`;
    let minNodeX = Math.min(...nodes.map((n) => n.position.x), 200);
    setNodes((ns) => [
      ...ns,
      {
        id: newResourceId,
        type: "resourceNode",
        data: resource,
        position: { x: minNodeX - 100, y: 200 },
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
      <Header
        addBuilding={addBuilding}
        addResource={addResource}
        sfData={sfData}
      />

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
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
