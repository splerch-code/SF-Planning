import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

export default function InputEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  onSelectEdge,
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleSelectEdge = () => {
    if (onSelectEdge) {
      onSelectEdge(null, { id, sourceX, sourceY, targetX, targetY, data });
    }
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ strokeWidth: 12, stroke: "rgba(242, 200, 0, .75)" }}
      />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="p-1 bg-sf-dark rounded text-sf border border-sf"
          onClick={handleSelectEdge}
        >
          {data.amount}
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
