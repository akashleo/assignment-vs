// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledInput, StyledSelect, StyledLabel, FormGroup } from '../components/StyledComponents.js';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: 'value'
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      handles={handles}
      nodeType="output"
    >
      <FormGroup>
        <StyledLabel>Name:</StyledLabel>
        <StyledInput 
          type="text" 
          value={currName} 
          onChange={handleNameChange}
          placeholder="Enter output name"
        />
      </FormGroup>
      <FormGroup>
        <StyledLabel>Type:</StyledLabel>
        <StyledSelect value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </StyledSelect>
      </FormGroup>
    </BaseNode>
  );
}
