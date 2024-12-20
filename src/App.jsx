import React, { useCallback, useState, useRef } from "react";
import {
  ReactFlow,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import ResourceNode from "./Nodes/ResourceNode";
import MachineNode from "./Nodes/MachineNode";
import ContainerNode from "./Nodes/ContainerNode";
import Header from "./Components/Header";
import sfData from "./data/sf-data.json";
import InputEdge from "./Edges/InputEdge";
import EditResource from "./Components/EditResource";
import EditInput from "./Components/EditInput";
import EditMachine from "./Components/EditMachine";
import EditContainer from "./Components/EditContainer";
import Todo from "./dev/Todo";
import LoadTodo from "./dev/LoadTodo";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  resourceNode: ResourceNode,
  machineNode: MachineNode,
  todoNode: Todo,
  containerNode: ContainerNode,
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
  // const { setViewport, zoomIn, zoomOut } = useReactFlow();

  const onConnect = useCallback(
    (params) => {
      clearNodeEdgeSelection();
      if (
        params.sourceHandle.split("-")[1] !=
          params.targetHandle.split("-")[1] &&
        params.targetHandle.split("-")[1] != "Container"
      ) {
        alert("Cannot connect nodes of different resources");
        return;
      }
      const newEdge = {
        id: `${params.source} -> ${params.target}`,
        ...params,
        animated: true,
        data: { amount: 0, name: params.sourceHandle.split("-")[1] },
        selectable: true,
        selected: true,
        label: "0",
        type: "inputEdge",
        onSelectEdge: onSelectEdge,
      };
      setEdges((eds) => addEdge(newEdge, eds));
      setSelectedEdge(newEdge);
    },
    [setEdges]
  );

  const addMachine = (recipe) => {
    let nodeList = [{ id: "0" }, ...nodes];
    const newMachineId = Math.max(...nodeList.map((n) => parseInt(n.id))) + 1;
    const maxNodeX = Math.max(...nodes.map((n) => n.position.x), 0);
    let data = { ...recipe, multiplier: 1, id: `${newMachineId}` };
    const newMachineNode = {
      id: `${newMachineId}`,
      type: "machineNode",
      data: data,
      position: { x: maxNodeX + 400, y: 200 },
      selectable: true,
      selected: true,
    };
    clearNodeEdgeSelection();
    setNodes((ns) => [...ns, newMachineNode]);
    setSelectedNode(newMachineNode);
  };

  const addResource = (resource) => {
    let nodeList = [{ id: "0" }, ...nodes];
    const newResourceId = Math.max(...nodeList.map((n) => parseInt(n.id))) + 1;
    let minNodeX = Math.min(...nodes.map((n) => n.position.x), 200);
    let data = { ...resource, amount: 0, used: 0, id: `${newResourceId}` };
    const newResourceNode = {
      id: `${newResourceId}`,
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

  const addContainer = () => {
    let nodeList = [{ id: "0" }, ...nodes];
    const newResourceId = Math.max(...nodeList.map((n) => parseInt(n.id))) + 1;
    clearNodeEdgeSelection();
    const containerNode = {
      id: `${newResourceId}`,
      type: "containerNode",
      position: { x: 100, y: 200 },
      selectable: true,
      data: { id: `${newResourceId}` },
      name: "Container",
    };
    setNodes((ns) => [...ns, containerNode]);
  };

  const onSelectNode = (e, node) => {
    setSelectedEdge(null);
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
      <LoadTodo setNodes={setNodes} nodes={nodes} />
      <Header
        addMachine={addMachine}
        addResource={addResource}
        addContainer={addContainer}
        sfData={sfData}
        nodes={nodes}
        edges={edges}
        setEdges={setEdges}
        setNodes={setNodes}
      />
      <EditResource
        selectedNode={selectedNode}
        clearAllSelections={clearNodeEdgeSelection}
        edges={edges}
        nodes={nodes}
        setNodes={setNodes}
        setEdges={setEdges}
      />
      <EditInput
        selectedEdge={selectedEdge}
        edges={edges}
        nodes={nodes}
        setEdges={setEdges}
        clearAllSelections={clearNodeEdgeSelection}
      />
      <EditMachine
        selectedNode={selectedNode}
        clearAllSelections={clearNodeEdgeSelection}
        setNodes={setNodes}
      />
      <EditContainer
        selectedNode={selectedNode}
        clearAllSelections={clearNodeEdgeSelection}
        setNodes={setNodes}
        setEdges={setEdges}
        edges={edges}
      />
      <div className="bg-sf-body w-screen h-screen flex-1 items-center justify-center text-white">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onSelectNode}
            onNodeDragStop={clearNodeEdgeSelection}
            onPaneClick={onSelectPane}
            onEdgeClick={(e, edge) => {
              setSelectedEdge(edge);
            }}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            colorMode="dark"
            minZoom={0.1}
            multiSelectionKeyCode={null}
            deleteKeyCode={null}
          >
            <Background />
            <MiniMap />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;
