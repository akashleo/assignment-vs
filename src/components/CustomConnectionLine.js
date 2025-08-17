// CustomConnectionLine.js - Custom connection line with removal button

import React, { useState, useMemo } from 'react';
import { getStraightPath, useReactFlow, BaseEdge } from 'reactflow';
import { ConnectionRemoveButton } from './StyledComponents';

export const CustomConnectionLine = ({ fromX, fromY, toX, toY, fromHandle, toHandle }) => {
  // Get straight path between the points
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <g className="custom-connection-line">
      <path d={edgePath} stroke="#6b7280" strokeWidth={2} fill="none" strokeDasharray="5,5" />
      
      {/* Source handle indicator (output) */}
      <text 
        x={fromX} 
        y={fromY} 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
        fill="#059669"
        style={{ pointerEvents: 'none' }}
      >
        -
      </text>
      
      {/* Target handle indicator (input) */}
      <text 
        x={toX} 
        y={toY} 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
        fill="#6b7280"
        style={{ pointerEvents: 'none' }}
      >
        ~
      </text>
    </g>
  );
};

export const CustomConnectionLineWrapper = ({ fromX, fromY, toX, toY }) => (
  <CustomConnectionLine fromX={fromX} fromY={fromY} toX={toX} toY={toY} />
);

export const CustomEdge = ({ 
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY, 
  sourcePosition,
  targetPosition,
  selected, 
  markerEnd,
  style = {},
  data = {}
}) => {
  const { setEdges } = useReactFlow();
  const [hover, setHover] = useState(false);

  // Calculate edge path, midpoint, and button position
  const { edgePath, midPoint } = useMemo(() => {
    const [path] = getStraightPath({ sourceX, sourceY, targetX, targetY });
    
    // Calculate the exact midpoint of the edge
    const mx = (sourceX + targetX) / 2;
    const my = (sourceY + targetY) / 2;
    
    return { 
      edgePath: path, 
      midPoint: { x: mx, y: my }
    };
  }, [sourceX, sourceY, targetX, targetY]);

  // Visual styling based on hover and selection states
  const strokeColor = selected ? '#0ea5e9' : hover ? '#60a5fa' : '#6b7280';
  const strokeWidth = selected ? 3 : hover ? 2.5 : 2;
  const strokeOpacity = selected ? 1 : hover ? 0.9 : 0.7;

  // Handle edge removal when button is clicked
  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <g
      className="custom-edge"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-edgeid={id}
    >
      {/* The actual edge path with improved styling */}
      <path 
        id={id}
        d={edgePath} 
        stroke={strokeColor} 
        strokeWidth={strokeWidth} 
        strokeOpacity={strokeOpacity}
        fill="none" 
        markerEnd={markerEnd}
        style={{
          transition: 'stroke 0.2s ease, stroke-width 0.2s ease, stroke-opacity 0.2s ease',
          pointerEvents: 'stroke',
          ...style
        }} 
      />

      {/* Connection removal button - perfectly centered on the edge */}
      <foreignObject
        width={28}
        height={28}
        x={midPoint.x - 14}
        y={midPoint.y - 14}
        className="edge-remove-button"
        style={{ 
          pointerEvents: 'all',
          overflow: 'visible'
        }}
      >
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          opacity: hover || selected ? 1 : 0.4, // Show with reduced opacity when not hovered
          transition: 'opacity 0.3s ease-in-out',
          transformOrigin: 'center center',
          transform: (hover || selected) ? 'scale(1)' : 'scale(0.9)' // Slight scale effect
        }}>
          <ConnectionRemoveButton 
            onClick={handleRemove} 
            style={{
              // Ensure perfect centering with no offsets
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: selected ? '0 0 0 2px rgba(37, 99, 235, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)' : undefined
            }}
          />
        </div>
      </foreignObject>
    </g>
  );
};
