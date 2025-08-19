// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledInput, StyledSelect, StyledLabel, FormGroup } from '../components/StyledComponents.js';
import { spacing } from '../styles/designSystem.js';

export const FilterNode = ({ id, data }) => {
  const [op, setOp] = useState(data?.op || 'contains');
  const [value1, setValue1] = useState(data?.value1 || '');
  const [value2, setValue2] = useState(data?.value2 || '');

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' },
  ];

  const operatorRowStyle = {
    display: 'flex',
    gap: spacing[2],
    alignItems: 'center',
  };

  const isLogical = op === '=' || op === '!=' || op === '>' || op === '<';

  return (
    <BaseNode id={id} data={data} title="Filter" handles={handles} nodeType="filter">
      <FormGroup>
        <StyledLabel>Operator:</StyledLabel>
        <StyledSelect value={op} onChange={(e) => setOp(e.target.value)}>
          <option value="contains">contains</option>
          <option value="=">=</option>
          <option value="!=">!=</option>
          <option value=">">{'>'}</option>
          <option value="<">{'<'}</option>
        </StyledSelect>
      </FormGroup>

      <FormGroup>
        <StyledLabel>{isLogical ? 'Value 1:' : 'Value:'}</StyledLabel>
        <StyledInput
          type="text"
          placeholder="Enter value"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
      </FormGroup>

      {isLogical && (
        <FormGroup>
          <StyledLabel>Value 2:</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Enter value"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </FormGroup>
      )}
    </BaseNode>
  );
};
