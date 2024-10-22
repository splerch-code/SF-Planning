import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import ResourceNode from "./Nodes/ResourceNode";
import MachineNode from "./Nodes/MachineNode";
import Header from "./Components/Header";
import sfData from "./data/sf-data.json";
import InputEdge from "./Edges/InputEdge";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  resourceNode: ResourceNode,
  machineNode: MachineNode,
};

const edgeTypes = {
  inputEdge: InputEdge,
};

const initialNodes = [];

const initialEdges = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        animated: true,
        style: { strokeWidth: 12, stroke: "rgba(242, 200, 0, .5)" },
        data: { amount: 0, label: "test" },
        selectable: true,
        selected: true,
        label: "0",
        type: "inputEdge",
      };
      clearNodeEdgeSelection();
      setEdges((eds) => addEdge(newEdge, eds));
      setSelectedEdge(newEdge);
    },
    [setEdges]
  );

  const addMachine = (recipe) => {
    const newMachineId = nodes.length + 1;
    const maxNodeX = Math.max(...nodes.map((n) => n.position.x), 0);
    let data = { ...recipe, multiplier: 1 };
    const newMachineNode = {
      id: `${newMachineId}`,
      type: "machineNode",
      data: data,
      position: { x: maxNodeX + 400, y: 200 },
      selectable: true,
      selected: true,
    };
    const firstY = 200;
    const newResourceNodes = recipe.products.map((product, index) => ({
      id: `${newMachineId + index + 1}`,
      type: "resourceNode",
      data: {
        name: product.item.name,
        used: 0,
        amount: product.amount,
        energy: product.item.energy,
        sinkPoints: product.item.points,
        hasSource: true,
      },
      position: { x: maxNodeX + 900, y: firstY + index * 100 },
      selectable: false,
    }));
    const newEdges = newResourceNodes.map((product) => ({
      id: `${newMachineId} -> ${product.id}`,
      source: `${newMachineId}`,
      target: product.id,
      animated: true,
      style: { strokeWidth: 12, stroke: "#5D5D5D77" },
      data: { test: "data" },
      selectable: false,
    }));
    clearNodeEdgeSelection();
    setNodes((ns) => [
      ...ns.map((node) => ({ ...node, selected: false })),
      newMachineNode,
      ...newResourceNodes,
    ]);
    setEdges((es) => [...es, ...newEdges]);
    setSelectedNode(newMachineNode);
  };

  const addResource = (resource) => {
    const newResourceId = `${nodes.length + 1}`;
    let minNodeX = Math.min(...nodes.map((n) => n.position.x), 200);
    let data = { ...resource, amount: 0, used: 0 };
    const newResourceNode = {
      id: newResourceId,
      type: "resourceNode",
      data: data,
      position: { x: minNodeX - 100, y: 200 },
      selectable: true,
      selected: true,
    };
    clearNodeEdgeSelection();
    setNodes((ns) => [
      ...ns.map((node) => ({ ...node, selected: false })),
      newResourceNode,
    ]);
    setSelectedNode(newResourceNode);
  };

  const onSelectNode = (e, node) => {
    setSelectedEdge(null);
    console.log(node);
    if (node.selectable) {
      setSelectedNode(node);
    }
  };
  const onSelectEdge = (e, edge) => {
    setSelectedNode(null);
    if (edge.selectable) {
      setSelectedEdge(edge);
    }
  };
  const onSelectPane = (e, pane) => {
    setSelectedNode(null);
    setSelectedEdge(null);
  };
  const clearNodeEdgeSelection = () => {
    setNodes((ns) => ns.map((node) => ({ ...node, selected: false })));
    setEdges((es) => es.map((edge) => ({ ...edge, selected: false })));
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header
        addMachine={addMachine}
        addResource={addResource}
        sfData={sfData}
      />
      <div
        style={{}}
        className="bg-sf-body w-screen h-screen flex-1 items-center justify-center text-white"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onSelectNode}
          onNodeDragStop={onSelectNode}
          onPaneClick={onSelectPane}
          onEdgeClick={(e, edge) => {
            setSelectedNode(null);
            console.log(edge);
          }}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          colorMode="dark"
          minZoom={0.1}
          multiSelectionKeyCode={null}
        >
          <Background />
          <MiniMap />
        </ReactFlow>

        {selectedNode && (
          <div className="absolute top-0 m-6 right-0 p-6 w-80 rounded bg-sf-ficsit-dark w-32 text-center z-20">
            {selectedNode.data.name}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
