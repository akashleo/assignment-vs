// dataSourceNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './basenode/baseNode.jsx';
import { StyledInput, StyledSelect, StyledTextarea, StyledLabel, FormGroup } from '../components/StyledComponents.js';

export const DataSourceNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/data');
  const [method, setMethod] = useState(data?.method || 'GET');
  const [headers, setHeaders] = useState(data?.headers || '');
  const [body, setBody] = useState(data?.body || '');

  const handles = [
    { type: 'target', position: Position.Left, id: 'config' },
    { type: 'source', position: Position.Right, id: 'response' },
  ];

  return (
    <BaseNode id={id} data={data} title="Data Source" handles={handles} nodeType="data">
      <FormGroup>
        <StyledLabel>URL:</StyledLabel>
        <StyledInput 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/data"
        />
      </FormGroup>
      
      <FormGroup>
        <StyledLabel>Method:</StyledLabel>
        <StyledSelect value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </StyledSelect>
      </FormGroup>

      <FormGroup>
        <StyledLabel>Headers (JSON):</StyledLabel>
        <StyledInput
          type="text"
          placeholder='{"Content-Type": "application/json"}'
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
        />
      </FormGroup>

      {method !== 'GET' && (
        <FormGroup>
          <StyledLabel>Body:</StyledLabel>
          <StyledTextarea
            rows={2}
            placeholder="Request body content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </FormGroup>
      )}
    </BaseNode>
  );
};
