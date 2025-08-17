// templateNode.js

import { useState, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledSelect, StyledTextarea, StyledLabel, FormGroup } from '../components/StyledComponents.js';
import { colors } from '../styles/designSystem.js';

export const TemplateNode = ({ id, data }) => {
  const [template, setTemplate] = useState(data?.template || 'Hello {{var1}} and {{var2}}');
  const [targetCount, setTargetCount] = useState(
    typeof data?.targetCount === 'number' ? Math.min(10, Math.max(2, data.targetCount)) : 3
  );

  const handles = useMemo(() => {
    const hs = [];
    // Evenly distribute target handles vertically on the left
    for (let i = 1; i <= targetCount; i++) {
      const topPct = Math.round((i / (targetCount + 1)) * 100);
      hs.push({
        type: 'target',
        position: Position.Left,
        id: `var${i}`,
        style: { top: `${topPct}%` },
      });
    }
    // Single output on the right
    hs.push({ type: 'source', position: Position.Right, id: 'output' });
    return hs;
  }, [targetCount]);

  const helpTextStyle = {
    fontSize: '0.75rem',
    color: colors.gray[500],
    fontStyle: 'italic'
  };

  return (
    <BaseNode id={id} data={data} title="Template" handles={handles} nodeType="template">
      <FormGroup>
        <StyledLabel>Input Variables:</StyledLabel>
        <StyledSelect
          value={targetCount}
          onChange={(e) => setTargetCount(parseInt(e.target.value, 10))}
        >
          {Array.from({ length: 9 }, (_, idx) => idx + 2).map((n) => (
            <option key={n} value={n}>{n} variables</option>
          ))}
        </StyledSelect>
      </FormGroup>

      <FormGroup>
        <StyledLabel>Template:</StyledLabel>
        <StyledTextarea 
          rows={3} 
          value={template} 
          onChange={(e) => setTemplate(e.target.value)}
          placeholder="Enter template with variables like {{var1}}, {{var2}}"
        />
        <div style={helpTextStyle}>
          Use {`{{var1}}..{{var${targetCount}}}`} placeholders for dynamic content
        </div>
      </FormGroup>
    </BaseNode>
  );
};
