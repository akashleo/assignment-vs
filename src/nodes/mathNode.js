import React, { useState, useCallback } from 'react';
import { BaseNode } from './basenode/baseNode';
import { StyledSelect, StyledInput, StyledTextarea, StyledLabel, FormGroup } from '../components/StyledComponents';

const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data.operation || 'wordCount');
  const [inputText, setInputText] = useState(data.inputText || '');
  const [result, setResult] = useState(data.result || '');
  
  // Handle operation selection
  const handleOperationChange = useCallback((e) => {
    setOperation(e.target.value);
    // Reset result when operation changes
    setResult('');
  }, []);
  
  // Handle text input change
  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);
  
  // Simplified - no actual calculation needed
  
  // Define the node's handles
  const handles = [
    { id: 'input', type: 'target', position: 'left', isConnected: !!data.inputs?.input },
    { id: 'output', type: 'source', position: 'right', isConnected: !!data.outputs?.output }
  ];
  
  return (
    <BaseNode 
      id={id} 
      title="Math Node" 
      nodeType="math" 
      handles={handles}
    >
      <FormGroup>
        <StyledLabel>Operation</StyledLabel>
        <StyledSelect 
          value={operation} 
          onChange={handleOperationChange}
        >
          <option value="wordCount">Word Count</option>
          <option value="charCount">Character Count</option>
          <option value="termFrequency">Term Frequency</option>
          <option value="tfidf">TF-IDF</option>
          <option value="ngrams">N-grams</option>
        </StyledSelect>
        
        <StyledLabel>Input Text</StyledLabel>
        <StyledTextarea 
          value={inputText} 
          onChange={handleInputChange}
          placeholder="Enter text to analyze..."
          rows={4}
        />
      </FormGroup>
    </BaseNode>
  );
};

export default MathNode;
