// visualizationNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledInput, StyledSelect, StyledLabel, FormGroup } from '../components/StyledComponents.js';
import { spacing } from '../styles/designSystem.js';

export const VisualizationNode = ({ id, data }) => {
  const [mode, setMode] = useState(data?.mode || 'raw');
  const [pretty, setPretty] = useState(data?.pretty ?? true);
  const [rows, setRows] = useState(data?.rows || 5);

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' },
  ];

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    fontSize: '0.875rem'
  };

  return (
    <BaseNode id={id} data={data} title="Visualize" handles={handles} nodeType="viz">
      <FormGroup>
        <StyledLabel>Display Mode:</StyledLabel>
        <StyledSelect value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="raw">Raw Text</option>
          <option value="json">JSON</option>
          <option value="table">Table</option>
          <option value="image">Image URL</option>
        </StyledSelect>
      </FormGroup>

      <label style={checkboxStyle}>
        <input 
          type="checkbox" 
          checked={pretty} 
          onChange={(e) => setPretty(e.target.checked)} 
        />
        <span>Pretty print</span>
      </label>

      <FormGroup>
        <StyledLabel>Max Rows:</StyledLabel>
        <StyledInput 
          type="number" 
          value={rows} 
          min={1} 
          max={100} 
          onChange={(e) => setRows(parseInt(e.target.value || '1', 10))}
        />
      </FormGroup>
    </BaseNode>
  );
};
