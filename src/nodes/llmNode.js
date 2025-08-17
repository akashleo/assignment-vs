// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { NodeTypeBadge } from '../components/StyledComponents.js';
import { colors, spacing } from '../styles/designSystem.js';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'system',
      style: { top: `${100/3}%` }
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'prompt',
      style: { top: `${200/3}%` }
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'response'
    }
  ];

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing[2],
    color: colors.gray[600],
    fontSize: '0.875rem'
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={handles}
      nodeType="llm"
    >
      <div style={contentStyle}>
        <NodeTypeBadge nodeType="llm" />
        <span>Large Language Model</span>
        <div style={{ fontSize: '0.75rem', color: colors.gray[500] }}>
          System • Prompt → Response
        </div>
      </div>
    </BaseNode>
  );
}
