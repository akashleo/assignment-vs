// baseNode.jsx

import React, { useState, useCallback } from 'react';
import { Handle, Position, useReactFlow, getConnectedEdges } from 'reactflow';
import { 
  StyledNodeContainer, 
  StyledNodeHeader, 
  StyledNodeContent,
  getStyledHandleProps,
  NodeCloseButton,
  ConnectionRemoveButton,
  NodeContainer,
  NodeHeader,
  StyledBadge
} from '../../components/StyledComponents.js';
import NodeResizeHandle from '../../components/NodeResizeHandle';
import '../../styles/nodeResponsive.css';

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  children, 
  handles = [],
  nodeType = 'base',
  style = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [hoveredHandles, setHoveredHandles] = useState({});
  
  // For connection removal
  const reactFlowInstance = useReactFlow();
  const { getNode, getEdges, deleteElements } = reactFlowInstance || {};
  
  const onNodeRemove = useCallback(() => {
    if (deleteElements) {
      const node = getNode(id);
      if (node) {
        // Find connected edges to this node
        const connectedEdges = getConnectedEdges([node], getEdges());
        // Delete both the node and its connected edges
        deleteElements({ nodes: [node], edges: connectedEdges });
      }
    }
  }, [id, getNode, getEdges, deleteElements]);
  
  const onHandleMouseEnter = useCallback((handleId) => {
    setHoveredHandles(prev => ({ ...prev, [handleId]: true }));
  }, []);
  
  const onHandleMouseLeave = useCallback((handleId) => {
    setHoveredHandles(prev => ({ ...prev, [handleId]: false }));
  }, []);
  
  const onEdgeRemove = useCallback((edgeId) => {
    if (deleteElements) {
      const edgeToRemove = getEdges().find(edge => edge.id === edgeId);
      if (edgeToRemove) {
        deleteElements({ edges: [edgeToRemove] });
      }
    }
  }, [getEdges, deleteElements]);

  return (
    <StyledNodeContainer
      nodeType={nodeType}
      isHovered={isHovered}
      isActive={isActive}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {/* Close button */}
      <NodeCloseButton onRemove={onNodeRemove} />
      
      {/* Render input handles */}
      {handles
        .filter(handle => handle.type === 'target')
        .map((handle, index) => (
          <Handle
            key={handle.id}
            type="target"
            position={handle.position || Position.Left}
            id={handle.id}
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: handle.isConnected ? '#10b981' : '#ffffff',
              border: '2px solid #10b981',
              borderRadius: '2px',
              left: '-6px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'crosshair',
              zIndex: 1000
            }}
            onMouseEnter={() => onHandleMouseEnter(handle.id)}
            onMouseLeave={() => onHandleMouseLeave(handle.id)}
          />
        ))}
      
      {/* Title/Header section */}
      <StyledNodeHeader title={title} nodeType={nodeType} />
      
      {/* Content area - rendered by children */}
      <StyledNodeContent>
        {children}
      </StyledNodeContent>
      
      {/* Render output handles */}
      {handles
        .filter(handle => handle.type === 'source')
        .map((handle, index) => (
          <Handle
            key={handle.id}
            type="source"
            position={handle.position || Position.Right}
            id={handle.id}
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: handle.isConnected ? '#f59e0b' : '#ffffff',
              border: '2px solid #f59e0b',
              borderRadius: '2px',
              right: '-6px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'crosshair',
              zIndex: 1000
            }}
            onMouseEnter={() => onHandleMouseEnter(handle.id)}
            onMouseLeave={() => onHandleMouseLeave(handle.id)}
          />
        ))}
        
      {/* Add resize handle */}
      <NodeResizeHandle nodeId={id} />
    </StyledNodeContainer>
  );
};
