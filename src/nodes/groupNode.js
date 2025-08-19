// groupNode.js

import { useState, useCallback, useRef, useEffect } from 'react';
import { Position, useReactFlow } from 'reactflow';
import '../styles/groupNode.css';

// Counter for auto-generating group names
let groupCounter = 1;

export const GroupNode = ({ id, data, selected }) => {
  const reactFlowInstance = useReactFlow();
  const [groupName] = useState(data?.groupName || `Group ${groupCounter++}`);
  const [width, setWidth] = useState(data?.width || 300);
  const [height, setHeight] = useState(data?.height || 200);
  const [isDragOver, setIsDragOver] = useState(false);
  const [groupedNodes, setGroupedNodes] = useState(data?.groupedNodes || []);
  const containerRef = useRef(null);

  // No handles for group nodes - they're containers
  const handles = [];

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    try {
      const nodeData = event.dataTransfer.getData('application/reactflow');
      if (nodeData) {
        const { nodeType, offset } = JSON.parse(nodeData);
        
        // Get the group container bounds
        const containerRect = containerRef.current.getBoundingClientRect();
        const reactFlowBounds = document.querySelector('.react-flow').getBoundingClientRect();
        
        // Calculate position relative to the group container
        const position = {
          x: event.clientX - containerRect.left - (offset?.x || 0),
          y: event.clientY - containerRect.top - (offset?.y || 0)
        };

        // Create a new node inside the group
        const newNodeId = `${nodeType}-${Date.now()}`;
        const newNode = {
          id: newNodeId,
          type: nodeType,
          position: position,
          data: { 
            label: `${nodeType} node`,
            groupId: id // Mark this node as belonging to this group
          },
          parentNode: id,
          extent: 'parent'
        };

        // Add the node to React Flow
        reactFlowInstance.addNodes(newNode);
        
        // Update grouped nodes state
        setGroupedNodes(prev => [...prev, newNodeId]);
        
        // Update the group node's data
        reactFlowInstance.setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    groupedNodes: [...groupedNodes, newNodeId]
                  }
                }
              : node
          )
        );
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  }, [id, reactFlowInstance, groupedNodes]);

  // Handle resizing
  const handleMouseDown = useCallback((event) => {
    if (event.target.classList.contains('group-resize-handle')) {
      event.preventDefault();
      event.stopPropagation();
      
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = width;
      const startHeight = height;

      const handleMouseMove = (e) => {
        const newWidth = Math.max(200, startWidth + (e.clientX - startX));
        const newHeight = Math.max(150, startHeight + (e.clientY - startY));
        setWidth(newWidth);
        setHeight(newHeight);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }, [width, height]);

  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    position: 'relative'
  };

  return (
    <div 
      ref={containerRef}
      className={`group-node-container ${isDragOver ? 'drag-over' : ''}`}
      style={containerStyle}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseDown={handleMouseDown}
    >
      <div className="group-label">
        {groupName}
      </div>
      
      <div className="group-drop-zone">
        {groupedNodes.length === 0 && (
          <div className="group-placeholder">
            Drag and drop nodes here to group them
          </div>
        )}
      </div>
      
      <div className="group-resize-handle" />
    </div>
  );
};
