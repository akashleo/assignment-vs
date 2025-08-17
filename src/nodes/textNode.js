// textNode.js

import { useState, useEffect, useMemo, useRef } from 'react';
import { Position, useReactFlow } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledTextarea, StyledLabel, FormGroup } from '../components/StyledComponents.js';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeSize, setNodeSize] = useState({ width: 300, height: 150 });
  const textareaRef = useRef(null);
  const reactFlowInstance = useReactFlow();

  // Minimum and maximum size constraints
  const MIN_WIDTH = 250;
  const MAX_WIDTH = 500;
  const MIN_HEIGHT = 120;
  const MAX_HEIGHT = 400;

  // Extract variables from text using regex
  const extractedVariables = useMemo(() => {
    const variableRegex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const variables = [];
    let match;
    
    while ((match = variableRegex.exec(currText)) !== null) {
      const variableName = match[1].trim();
      if (!variables.includes(variableName)) {
        variables.push(variableName);
      }
    }
    
    return variables;
  }, [currText]);

  // Auto-resize functionality
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      // Reset height to auto to get the actual content height
      textarea.style.height = 'auto';
      
      // Calculate new dimensions based on content
      const contentHeight = textarea.scrollHeight;
      const longestLine = Math.max(...currText.split('\n').map(line => line.length));
      
      // Calculate width based on content (approximate)
      const charWidth = 8; // Average character width in pixels
      const contentWidth = Math.max(200, longestLine * charWidth + 40); // 40px for padding
      
      // Apply constraints
      const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, contentWidth));
      const newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, contentHeight + 80)); // 80px for header and padding
      
      // Update node size if it changed significantly
      if (Math.abs(newWidth - nodeSize.width) > 10 || Math.abs(newHeight - nodeSize.height) > 10) {
        setNodeSize({ width: newWidth, height: newHeight });
        
        // Update the node dimensions in ReactFlow
        if (reactFlowInstance?.setNodes) {
          reactFlowInstance.setNodes((nds) =>
            nds.map((node) =>
              node.id === id
                ? {
                    ...node,
                    style: {
                      ...node.style,
                      width: newWidth,
                      height: newHeight,
                    },
                  }
                : node
            )
          );
        }
      }
    }
  }, [currText, nodeSize, id, reactFlowInstance]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create dynamic handles based on extracted variables
  const dynamicHandles = useMemo(() => {
    const inputHandles = extractedVariables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: variable,
      style: {
        top: `${30 + (index * 25)}px`, // Position handles vertically with spacing
      }
    }));

    // Always include the output handle
    const outputHandle = {
      type: 'source',
      position: Position.Right,
      id: 'output'
    };

    return [...inputHandles, outputHandle];
  }, [extractedVariables]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={dynamicHandles}
      nodeType="text"
      style={{
        width: nodeSize.width,
        height: nodeSize.height,
        minWidth: MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        minHeight: MIN_HEIGHT,
        maxHeight: MAX_HEIGHT,
      }}
    >
      <FormGroup>
        <StyledLabel>Text:</StyledLabel>
        <StyledTextarea 
          ref={textareaRef}
          value={currText} 
          onChange={handleTextChange}
          placeholder="Enter text with variables like {{input}}"
          rows={Math.max(3, Math.min(10, currText.split('\n').length))}
          style={{
            resize: 'none', // Disable manual resize since we're auto-resizing
            overflow: 'hidden',
            minHeight: '60px',
          }}
        />
        {extractedVariables.length > 0 && (
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            <strong>Variables detected:</strong> {extractedVariables.join(', ')}
          </div>
        )}
      </FormGroup>
    </BaseNode>
  );
}
