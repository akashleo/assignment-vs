// conditionNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledInput, StyledLabel, FormGroup } from '../components/StyledComponents.js';
import { colors } from '../styles/designSystem.js';

export const ConditionNode = ({ id, data }) => {
  const [expr, setExpr] = useState(data?.expr || 'input != null');

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'true', style: { top: '33%' } },
    { type: 'source', position: Position.Right, id: 'false', style: { top: '66%' } },
  ];

  const helpTextStyle = {
    fontSize: '0.75rem',
    color: colors.gray[500],
    fontStyle: 'italic'
  };

  return (
    <BaseNode id={id} data={data} title="Condition" handles={handles} nodeType="condition">
      <FormGroup>
        <StyledLabel>Expression:</StyledLabel>
        <StyledInput
          type="text"
          placeholder="expression (e.g., input != null)"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
        />
        <div style={helpTextStyle}>
          Emits to true/false outputs based on evaluation
        </div>
      </FormGroup>
    </BaseNode>
  );
};
