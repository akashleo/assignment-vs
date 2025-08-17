// NodeResizeHandle.js - A resizable handle for nodes

import React, { useCallback, useState } from 'react';
import { useReactFlow } from 'reactflow';

export const NodeResizeHandle = ({ nodeId }) => {
  const { setNodes, getNode } = useReactFlow();
  const [isResizing, setIsResizing] = useState(false);
  
  const onMouseDown = useCallback(event => {
    // Prevent default behavior and propagation
    event.preventDefault();
    event.stopPropagation();
    
    const node = getNode(nodeId);
    if (!node) return;
    
    // Store initial position and node dimensions
    const startX = event.clientX;
    const startY = event.clientY;
    
    // Get current node dimensions from style or defaults
    const currentStyle = node.style || {};
    const initialWidth = parseInt(currentStyle.width) || node.width || 200;
    const initialHeight = parseInt(currentStyle.height) || node.height || 100;
    
    setIsResizing(true);
    
    // Define resize handlers
    const onMouseMove = moveEvent => {
      // Calculate width/height difference
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      // Set new dimensions with constraints
      const newWidth = Math.max(150, initialWidth + deltaX);
      const newHeight = Math.max(50, initialHeight + deltaY);
      
      setNodes(nodes => 
        nodes.map(node => {
          if (node.id === nodeId) {
            // Keep the styles property if it exists
            const style = node.style || {};
            
            return {
              ...node,
              style: {
                ...style,
                width: `${newWidth}px`,
                height: `${newHeight}px`
              }
            };
          }
          return node;
        })
      );
    };
    
    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'auto';
    };
    
    document.body.style.cursor = 'se-resize';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [nodeId, getNode, setNodes]);
  
  return (
    <div 
      className="node-resize-control"
      onMouseDown={onMouseDown}
      title="Resize node"
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '20px',
        height: '20px',
        cursor: 'se-resize',
        zIndex: 10,
        opacity: isResizing ? 1 : 0.5,
        transition: 'opacity 0.2s',
        background: 'linear-gradient(135deg, transparent 50%, #6b7280 50%)',
        borderRadius: '0 0 4px 0',
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
      onMouseLeave={(e) => !isResizing && (e.currentTarget.style.opacity = 0.5)}
    />
  );
};

export default NodeResizeHandle;
