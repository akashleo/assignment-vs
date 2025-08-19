// llmNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledInput, StyledSelect, StyledLabel, FormGroup, StyledTextarea } from '../components/StyledComponents.js';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const [role, setRole] = useState(data?.role || '');
  const [prompt, setPrompt] = useState(data?.prompt || '');

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

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={handles}
      nodeType="llm"
    >
      <FormGroup>
        <StyledLabel>Model:</StyledLabel>
        <StyledSelect value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-2">Claude 2</option>
          <option value="gemini-pro">Gemini Pro</option>
        </StyledSelect>
      </FormGroup>
      <FormGroup>
        <StyledLabel>Agent Role:</StyledLabel>
        <StyledInput 
          type="text" 
          placeholder="e.g., a helpful assistant"
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
        />
      </FormGroup>
      <FormGroup>
        <StyledLabel>Prompt:</StyledLabel>
        <StyledTextarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          rows={4}
        />
      </FormGroup>
    </BaseNode>
  );
}
