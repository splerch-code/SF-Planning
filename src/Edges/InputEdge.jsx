import React from "react";
import { BaseEdge, getBezierPath } from "@xyflow/react";

const InputEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}) => {
  // You can calculate the path of the edge (e.g., using a Bezier curve)
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Set dynamic label style based on the edge's `data`
  const labelStyle = {
    fontSize: data?.labelFontSize || "12px",
    color: data?.labelColor || "#000",
    backgroundColor: data?.labelBackground || "#fff",
    padding: "2px 5px",
    borderRadius: "4px",
  };
  console.log("InputEdge data: ", data);

  return (
    <>
      {/* The edge line */}
      <BaseEdge path={edgePath} markerEnd={markerEnd} />

      {/* Edge label */}
      {data?.label && (
        <text>
          <textPath
            href={`#${id}`}
            style={labelStyle}
            startOffset="50%"
            textAnchor="middle"
          >
            {data.label}
          </textPath>
        </text>
      )}
    </>
  );
};

export default InputEdge;
