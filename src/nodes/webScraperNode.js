import React, { useState, useCallback } from 'react';
import { BaseNode } from './basenode/baseNode';
import { StyledInput, StyledTextarea, StyledLabel, FormGroup, StyledSelect } from '../components/StyledComponents';

const WebScraperNode = ({ id, data }) => {
  const [url, setUrl] = useState(data.url || '');
  const [selectors, setSelectors] = useState(data.selectors || '');
  const [dataFields, setDataFields] = useState(data.dataFields || []);
  const [newField, setNewField] = useState({ name: '', selector: '' });
  const [result, setResult] = useState(data.result || '');
  const [status, setStatus] = useState('idle');
  
  // Handle URL input change
  const handleUrlChange = useCallback((e) => {
    setUrl(e.target.value);
  }, []);
  
  // Handle selectors input change
  const handleSelectorsChange = useCallback((e) => {
    setSelectors(e.target.value);
  }, []);
  
  // Handle new field input changes
  const handleFieldNameChange = useCallback((e) => {
    setNewField(prev => ({ ...prev, name: e.target.value }));
  }, []);
  
  const handleFieldSelectorChange = useCallback((e) => {
    setNewField(prev => ({ ...prev, selector: e.target.value }));
  }, []);
  
  // Add a new data field
  const addDataField = useCallback(() => {
    if (newField.name && newField.selector) {
      setDataFields(prev => [...prev, { ...newField }]);
      setNewField({ name: '', selector: '' });
    }
  }, [newField]);
  
  // Remove a data field
  const removeDataField = useCallback((index) => {
    setDataFields(prev => prev.filter((_, i) => i !== index));
  }, []);
  
  // Simplified - no actual scraping needed
  
  // Define the node's handles
  const handles = [
    { id: 'input', type: 'target', position: 'left', isConnected: !!data.inputs?.input },
    { id: 'output', type: 'source', position: 'right', isConnected: !!data.outputs?.output }
  ];
  
  return (
    <BaseNode 
      id={id} 
      title="Web Scraper" 
      nodeType="scraper" 
      handles={handles}
    >
      <FormGroup>
        <StyledLabel>Target URL</StyledLabel>
        <StyledInput 
          type="text" 
          value={url} 
          onChange={handleUrlChange}
          placeholder="https://example.com"
        />
        
        <StyledLabel>CSS Selectors</StyledLabel>
        <StyledTextarea 
          value={selectors} 
          onChange={handleSelectorsChange}
          placeholder="E.g., .product-title, #main-content, etc."
          rows={2}
        />
        
        <StyledLabel>Data Field Name</StyledLabel>
        <StyledInput 
          type="text" 
          value={newField.name} 
          onChange={handleFieldNameChange}
          placeholder="Field name"
        />
        
        <StyledLabel>CSS Selector</StyledLabel>
        <StyledInput 
          type="text" 
          value={newField.selector} 
          onChange={handleFieldSelectorChange}
          placeholder="CSS selector"
        />
      </FormGroup>
    </BaseNode>
  );
};

export default WebScraperNode;
