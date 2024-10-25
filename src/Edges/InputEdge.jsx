import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";

export default function InputEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  onSelectEdge,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: "right",
    targetPosition: "left",
  });

  const handleSelectEdge = () => {
    if (onSelectEdge) {
      onSelectEdge(null, { id, sourceX, sourceY, targetX, targetY, data });
    }
  };
  const round = (n) => Math.round(n * 1000) / 1000;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ strokeWidth: 12 }}
        className="stroke-sf-ficsit"
      />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="py-1 px-2 bg-sf-dark rounded-full text-white font-bold border-2 border-sf"
          onClick={handleSelectEdge}
        >
          {round(data.amount)}
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
