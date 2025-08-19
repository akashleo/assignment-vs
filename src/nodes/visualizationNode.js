// visualizationNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledInput, StyledSelect, StyledLabel, FormGroup } from '../components/StyledComponents.js';
import { spacing } from '../styles/designSystem.js';

export const VisualizationNode = ({ id, data }) => {
  const [mode, setMode] = useState(data?.mode || 'raw');

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' },
  ];

  return (
    <BaseNode id={id} data={data} title="Visualize" handles={handles} nodeType="viz">
      <FormGroup>
        <StyledLabel>Display Mode:</StyledLabel>
        <StyledSelect value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="raw">Raw Text</option>
          <option value="json">JSON</option>
          <option value="table">Table</option>
          <option value="image">Image URL</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
        </StyledSelect>
      </FormGroup>
    </BaseNode>
  );
};
