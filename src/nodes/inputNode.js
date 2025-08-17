// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledInput, StyledSelect, StyledLabel, FormGroup } from '../components/StyledComponents.js';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    { 
      type: 'source',
      position: Position.Right,
      id: 'value'
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      handles={handles}
      nodeType="input"
    >
      <FormGroup>
        <StyledLabel>Name:</StyledLabel>
        <StyledInput 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
          placeholder="Enter input name"
        />
      </FormGroup>
      <FormGroup>
        <StyledLabel>Type:</StyledLabel>
        <StyledSelect value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </StyledSelect>
      </FormGroup>
    </BaseNode>
  );
}
