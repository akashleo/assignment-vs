// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const getNodeTypeClass = (nodeType) => {
      const typeMap = {
        'customInput': 'input',
        'customOutput': 'output',
        'llm': 'llm',
        'text': 'text',
        'filter': 'filter',
        'condition': 'condition',
        'dataSource': 'data',
        'template': 'template',
        'visualization': 'viz',
        'math': 'math',
        'webScraper': 'scraper'
      };
      return typeMap[nodeType] || 'input';
    };
  
    return (
      <div
        className={`draggable-node ${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab',
          width: '100%',
          height: '100%',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexDirection: 'column',
          background: 'transparent'
        }} 
        draggable
      >
        {icon && (
          <div className={`node-icon ${getNodeTypeClass(type)}`}>
            {icon}
          </div>
        )}
        <span className="node-label">{label}</span>
      </div>
    );
  };
  