// groupNode.js

import { useState, useCallback, useRef } from 'react';
import { useReactFlow } from 'reactflow';
import '../styles/groupNode.css';

// Counter for auto-generating group names
let groupCounter = 1;

export const GroupNode = ({ id, data, selected }) => {
  const reactFlowInstance = useReactFlow();
  const [groupName] = useState(data?.groupName || `Group ${groupCounter++}`);
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

  // CSS-based resizing handled via .group-node-container { resize: both; overflow: auto; }

  // size controlled by CSS (see groupNode.css)

  return (
    <div 
      ref={containerRef}
      className={`group-node-container ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
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
    </div>
  );
};
