import React, { useState } from 'react';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { DraggableNode } from './draggableNode';
import './styles/dashboard.css';

const nodeCategories = {
  Start: [
    { type: 'customInput', label: 'Input', icon: 'I' },
    { type: 'text', label: 'Text', icon: 'T' }
  ],
  Objects: [
    { type: 'customOutput', label: 'Output', icon: 'O' },
    { type: 'filter', label: 'Filter', icon: 'F' },
    { type: 'condition', label: 'Condition', icon: 'C' }
  ],
  Knowledge: [
    { type: 'dataSource', label: 'Data Source', icon: 'D' },
    { type: 'template', label: 'Template', icon: 'T' }
  ],
  AI: [
    { type: 'llm', label: 'LLM', icon: 'L' }
  ],
  Data: [
    { type: 'visualization', label: 'Visualize', icon: 'V' }
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('Start');
  
  // No search functionality, directly use the active tab
  const filteredNodes = { [activeTab]: nodeCategories[activeTab] };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">VectorShift</h1>
        
        <nav className="tab-navigation">
          {Object.keys(nodeCategories).map(tab => (
            <button
              key={tab}
              className={`tab-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="tab-content">

        <div className="node-grid">
          {Object.entries(filteredNodes).map(([category, nodes]) => (
            <React.Fragment key={category}>
              {nodes.map(node => (
                <div key={node.type} className="node-item">
                  <DraggableNode 
                    type={node.type} 
                    label={node.label}
                    icon={node.icon}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="pipeline-workspace">
        <PipelineUI />
      </div>

      <div className="submit-section">
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
