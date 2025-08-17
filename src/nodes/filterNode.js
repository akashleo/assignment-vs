// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledInput, StyledSelect, StyledLabel, FormGroup } from '../components/StyledComponents.js';
import { spacing } from '../styles/designSystem.js';

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [op, setOp] = useState(data?.op || 'contains');
  const [value, setValue] = useState(data?.value || '');
  const [keep, setKeep] = useState(data?.keep ?? true);

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

  const operatorRowStyle = {
    display: 'flex',
    gap: spacing[2],
    alignItems: 'center'
  };

  return (
    <BaseNode id={id} data={data} title="Filter" handles={handles} nodeType="filter">
      <FormGroup>
        <StyledLabel>Field:</StyledLabel>
        <StyledInput
          type="text"
          placeholder="field (e.g. name)"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
      </FormGroup>
      
      <FormGroup>
        <StyledLabel>Condition:</StyledLabel>
        <div style={operatorRowStyle}>
          <StyledSelect value={op} onChange={(e) => setOp(e.target.value)} style={{ flex: '0 0 auto', minWidth: '80px' }}>
            <option value="=">=</option>
            <option value="!=">!=</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="contains">contains</option>
          </StyledSelect>
          <StyledInput
            type="text"
            placeholder="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ flex: 1 }}
          />
        </div>
      </FormGroup>

      <label style={checkboxStyle}>
        <input
          type="checkbox"
          checked={keep}
          onChange={(e) => setKeep(e.target.checked)}
        />
        <span>Keep matches</span>
      </label>
    </BaseNode>
  );
};
