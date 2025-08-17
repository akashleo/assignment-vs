// StyledComponents.js - Styled components using the design system

import React from 'react';
import { colors, nodeStyles, handleStyles, formStyles, spacing, borderRadius, shadows, transitions } from '../styles/designSystem.js';

// Styled Node Container
export const StyledNodeContainer = ({ 
  children, 
  nodeType = 'base', 
  isHovered = false, 
  isActive = false,
  style = {} 
}) => {
  const nodeTypeColor = colors.secondary[nodeType] || colors.primary[500];
  
  const containerStyle = {
    ...nodeStyles.base,
    borderColor: nodeTypeColor,
    ...(isHovered && nodeStyles.hover),
    ...(isActive && nodeStyles.active),
    ...style
  };

  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

// Styled Node Header
export const StyledNodeHeader = ({ title, nodeType = 'base', style = {} }) => {
  const nodeTypeColor = colors.secondary[nodeType] || colors.primary[500];
  
  const headerStyle = {
    ...nodeStyles.header,
    backgroundColor: `${nodeTypeColor}15`,
    borderBottomColor: `${nodeTypeColor}30`,
    color: nodeTypeColor,
    ...style
  };

  return (
    <div style={headerStyle}>
      {title}
    </div>
  );
};

// Styled Node Content
export const StyledNodeContent = ({ children, style = {} }) => {
  const contentStyle = {
    ...nodeStyles.content,
    ...style
  };

  return (
    <div style={contentStyle}>
      {children}
    </div>
  );
};

// Styled Input Field
export const StyledInput = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  style = {},
  nodeType = null,
  ...props 
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const inputStyle = {
    ...formStyles.input,
    width: '100%',
    boxSizing: 'border-box',
    ...(nodeType && formStyles.themedInput(nodeType)),
    ...(isFocused && {
      borderColor: nodeType ? colors.secondary[nodeType] || colors.primary[500] : colors.primary[500],
      boxShadow: `0 0 0 2px ${nodeType ? colors.secondary[nodeType] || colors.primary[500] : colors.primary[500]}20`,
    }),
    ...(isHovered && !isFocused && {
      borderColor: nodeType ? `${colors.secondary[nodeType] || colors.primary[500]}80` : colors.gray[400],
    }),
    ...style
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={inputStyle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    />
  );
};

// Styled Select Dropdown
export const StyledSelect = ({ 
  value, 
  onChange, 
  children, 
  style = {},
  nodeType = null,
  ...props 
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const selectStyle = {
    ...formStyles.select,
    width: '100%',
    boxSizing: 'border-box',
    ...(nodeType && formStyles.themedSelect(nodeType)),
    ...(isFocused && {
      borderColor: nodeType ? colors.secondary[nodeType] || colors.primary[500] : colors.primary[500],
      boxShadow: `0 0 0 2px ${nodeType ? colors.secondary[nodeType] || colors.primary[500] : colors.primary[500]}20`,
    }),
    ...(isHovered && !isFocused && {
      borderColor: nodeType ? `${colors.secondary[nodeType] || colors.primary[500]}80` : colors.gray[400],
    }),
    ...style
  };

  return (
    <select
      value={value}
      onChange={onChange}
      style={selectStyle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </select>
  );
};

// Styled Textarea
export const StyledTextarea = ({ 
  value, 
  onChange, 
  placeholder = '', 
  rows = 3,
  style = {},
  nodeType = null,
  ...props 
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const textareaStyle = {
    ...formStyles.textarea,
    width: '100%',
    boxSizing: 'border-box',
    ...(nodeType && formStyles.themedTextarea(nodeType)),
    ...(isFocused && {
      borderColor: nodeType ? colors.secondary[nodeType] || colors.primary[500] : colors.primary[500],
      boxShadow: `0 0 0 2px ${nodeType ? colors.secondary[nodeType] || colors.primary[500] : colors.primary[500]}20`,
    }),
    ...(isHovered && !isFocused && {
      borderColor: nodeType ? `${colors.secondary[nodeType] || colors.primary[500]}80` : colors.gray[400],
    }),
    ...style
  };

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={textareaStyle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    />
  );
};

// Styled Label
export const StyledLabel = ({ children, style = {}, nodeType = null }) => {
  const labelStyle = {
    ...formStyles.label,
    ...(nodeType && formStyles.themedLabel(nodeType)),
    ...style
  };

  return (
    <label style={labelStyle}>
      {children}
    </label>
  );
};

// Styled Handle (for ReactFlow handles)
export const getStyledHandleProps = (type = 'input', isConnected = false, isHovered = false) => {
  const baseStyle = {
    width: '16px',
    height: '16px',
    borderRadius: '2px', // Slightly rounded for better visual
    border: `2px solid ${type === 'input' ? colors.handle.input : colors.handle.output}`,
    backgroundColor: isConnected ? (type === 'input' ? colors.handle.input : colors.handle.output) : 'white',
    transition: transitions.fast,
    cursor: 'crosshair',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    color: isConnected ? 'white' : (type === 'input' ? colors.handle.input : colors.handle.output),
    position: 'absolute',
    zIndex: 10,
    // Ensure handles are interactive
    pointerEvents: 'all',
    // Handle positioning
    ...(type === 'input' ? {
      left: '-8px',
      transform: 'translateY(-50%)',
    } : {
      right: '-8px', 
      transform: 'translateY(-50%)',
    }),
    ...(isHovered && {
      transform: `translateY(-50%) scale(1.2)`,
      boxShadow: `0 0 0 3px ${type === 'input' ? colors.handle.input : colors.handle.output}30`,
    })
  };

  return {
    style: baseStyle
  };
};

// Connection Line Cross Button
export const ConnectionRemoveButton = ({ onClick, style = {} }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const buttonStyle = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: isHovered ? colors.error : 'rgba(255, 255, 255, 0.9)',
    border: `1.5px solid ${isHovered ? colors.error : colors.gray[400]}`,
    boxShadow: `${shadows.sm}, 0 0 0 1px rgba(255, 255, 255, 0.8)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1000, // Ensure it's on top of everything
    transition: `${transitions.fast}, transform 0.1s ease`,
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    ...style
  };
  
  // Fixed cross styling with direct elements instead of pseudo-elements
  return (
    <div 
      style={buttonStyle} 
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (onClick) onClick(e);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Remove connection"
    >
      <div style={{
        position: 'relative',
        width: '10px',
        height: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          width: '10px',
          height: '2px',
          backgroundColor: isHovered ? 'white' : colors.error,
          borderRadius: '1px',
          transform: 'rotate(45deg)'
        }} />
        <div style={{
          position: 'absolute',
          width: '10px',
          height: '2px',
          backgroundColor: isHovered ? 'white' : colors.error,
          borderRadius: '1px',
          transform: 'rotate(-45deg)'
        }} />
      </div>
    </div>
  );
};

// Form Group Component for consistent spacing
export const FormGroup = ({ children, style = {} }) => {
  const groupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    ...style
  };

  return (
    <div style={groupStyle}>
      {children}
    </div>
  );
};

// Node type indicator badge
export const NodeTypeBadge = ({ nodeType, style = {} }) => {
  const nodeTypeColor = colors.secondary[nodeType] || colors.primary[500];
  
  const badgeStyle = {
    display: 'inline-block',
    padding: `${spacing[1]} ${spacing[2]}`,
    backgroundColor: `${nodeTypeColor}20`,
    color: nodeTypeColor,
    borderRadius: borderRadius.full,
    fontSize: '0.625rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    ...style
  };

  return (
    <span style={badgeStyle}>
      {nodeType}
    </span>
  );
};

// Node Close Button with two-click behavior
export const NodeCloseButton = ({ onRemove, style = {} }) => {
  const [activateState, setActivateState] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleClick = () => {
    if (activateState === 0) {
      setActivateState(1);
      // Reset after 3 seconds if second click doesn't happen
      setTimeout(() => setActivateState(0), 3000);
    } else {
      onRemove();
    }
  };
  
  const buttonStyle = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: activateState === 0 ? (isHovered ? colors.gray[100] : 'transparent') : colors.error,
    border: activateState === 0 ? `1px solid ${colors.gray[400]}` : `1px solid ${colors.error}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    transition: transitions.fast,
    ...style
  };
  
  return (
    <div 
      style={buttonStyle} 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={activateState === 0 ? "Click to prepare removal" : "Click again to remove"}
    >
      <div style={{
        position: 'relative',
        width: '10px',
        height: '10px',
      }}>
        <div style={{
          position: 'absolute',
          width: '10px',
          height: '2px',
          backgroundColor: activateState === 0 ? colors.gray[600] : 'white',
          top: '4px',
          left: '0',
          transform: 'rotate(45deg)'
        }} />
        <div style={{
          position: 'absolute',
          width: '10px',
          height: '2px',
          backgroundColor: activateState === 0 ? colors.gray[600] : 'white',
          top: '4px',
          left: '0',
          transform: 'rotate(-45deg)'
        }} />
      </div>
    </div>
  );
};
