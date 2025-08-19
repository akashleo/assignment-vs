// designSystem.js - Unified design system for VectorShift nodes

export const colors = {
  // Primary color palette
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Secondary colors for different node types
  secondary: {
    input: '#10b981',     // Green for input nodes
    output: '#f59e0b',    // Amber for output nodes
    llm: '#8b5cf6',       // Purple for LLM nodes
    text: '#06b6d4',      // Cyan for text nodes
    filter: '#ef4444',    // Red for filter nodes
    condition: '#f97316', // Orange for condition nodes
    data: '#84cc16',      // Lime for data source nodes
    viz: '#ec4899',       // Pink for visualization nodes
    group: '#6366f1',  // Indigo for group nodes
  },
  
  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Handle colors
  handle: {
    input: '#6b7280',
    output: '#059669',
    connected: '#10b981',
    hover: '#3b82f6',
  }
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  }
};

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '300ms ease-in-out',
  slow: '500ms ease-in-out',
};

// Node-specific styling configurations
export const nodeStyles = {
  base: {
    minWidth: '200px',
    minHeight: '80px',
    borderRadius: borderRadius.lg,
    boxShadow: shadows.md,
    border: `2px solid ${colors.gray[200]}`,
    backgroundColor: colors.gray[50],
    transition: transitions.normal,
    fontFamily: typography.fontFamily.sans.join(', '),
  },
  
  hover: {
    boxShadow: shadows.lg,
    transform: 'translateY(-2px)',
  },
  
  active: {
    boxShadow: shadows.xl,
    transform: 'translateY(-1px)',
  },
  
  header: {
    padding: `${spacing[3]} ${spacing[4]}`,
    borderBottom: `1px solid ${colors.gray[200]}`,
    backgroundColor: colors.gray[100],
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[700],
  },
  
  content: {
    padding: spacing[4],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  }
};

// Handle styling
export const handleStyles = {
  base: {
    width: '10px',
    height: '10px',
    borderRadius: borderRadius.full,
    border: `1px solid ${colors.handle.input}`,
    backgroundColor: colors.gray[50],
    transition: transitions.fast,
    transform: 'translateX(-50%)',
    position: 'absolute',
    zIndex: 5,
  },
  
  input: {
    backgroundColor: colors.gray[50],
    borderColor: colors.handle.input,
  },
  
  output: {
    backgroundColor: colors.gray[50],
    borderColor: colors.handle.output,
    transform: 'translateX(50%)',
  },
  
  connected: {
    backgroundColor: colors.handle.connected,
    borderColor: colors.handle.connected,
    boxShadow: `0 0 0 2px ${colors.handle.connected}22`,
  },
  
  hover: {
    backgroundColor: colors.handle.hover,
    borderColor: colors.handle.hover,
    transform: 'scale(1.2) translateX(-40%)',
  },
  
  outputHover: {
    backgroundColor: colors.handle.hover,
    borderColor: colors.handle.hover,
    transform: 'scale(1.2) translateX(40%)',
  }
};

// Form element styling
export const formStyles = {
  input: {
    width: '100%',
    padding: `${spacing[2]} ${spacing[3]}`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.gray[300],
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans.join(', '),
    backgroundColor: 'white',
    transition: transitions.fast,
    color: colors.gray[800],
    
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary[500],
      boxShadow: `0 0 0 2px ${colors.primary[500]}20`,
      backgroundColor: 'white',
    },
    
    '&:hover': {
      borderColor: colors.gray[400],
      backgroundColor: colors.gray[50],
    }
  },
  
  // Themed input variations
  themedInput: (nodeType) => {
    const nodeTypeColor = colors.secondary[nodeType] || colors.primary[500];
    return {
      borderColor: `${nodeTypeColor}50`,
      '&:focus': {
        borderColor: nodeTypeColor,
        boxShadow: `0 0 0 2px ${nodeTypeColor}20`,
      },
      '&:hover': {
        borderColor: nodeTypeColor,
      }
    };
  },
  
  select: {
    width: '100%',
    padding: `${spacing[2]} ${spacing[3]}`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.gray[300],
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans.join(', '),
    backgroundColor: 'white',
    transition: transitions.fast,
    cursor: 'pointer',
    color: colors.gray[800],
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundPosition: 'right 8px center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px 16px',
    paddingRight: spacing[8],
    
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary[500],
      boxShadow: `0 0 0 2px ${colors.primary[500]}20`,
    },
    
    '&:hover': {
      borderColor: colors.gray[400],
      backgroundColor: colors.gray[50],
    }
  },
  
  // Themed select variation
  themedSelect: (nodeType) => {
    const nodeTypeColor = colors.secondary[nodeType] || colors.primary[500];
    return {
      borderColor: `${nodeTypeColor}50`,
      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23${nodeTypeColor.substring(1)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
      '&:focus': {
        borderColor: nodeTypeColor,
        boxShadow: `0 0 0 2px ${nodeTypeColor}20`,
      },
      '&:hover': {
        borderColor: nodeTypeColor,
      }
    };
  },
  
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.gray[700],
    marginBottom: spacing[1],
    display: 'block',
  },
  
  // Themed label variation
  themedLabel: (nodeType) => {
    const nodeTypeColor = colors.secondary[nodeType] || colors.primary[500];
    return {
      color: nodeTypeColor,
    };
  },
  
  textarea: {
    width: '100%',
    padding: `${spacing[2]} ${spacing[3]}`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.gray[300],
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans.join(', '),
    backgroundColor: 'white',
    transition: transitions.fast,
    resize: 'vertical',
    minHeight: '60px',
    color: colors.gray[800],
    
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary[500],
      boxShadow: `0 0 0 2px ${colors.primary[500]}20`,
      backgroundColor: 'white',
    },
    
    '&:hover': {
      borderColor: colors.gray[400],
      backgroundColor: colors.gray[50],
    }
  },
  
  // Themed textarea variation
  themedTextarea: (nodeType) => {
    const nodeTypeColor = colors.secondary[nodeType] || colors.primary[500];
    return {
      borderColor: `${nodeTypeColor}50`,
      '&:focus': {
        borderColor: nodeTypeColor,
        boxShadow: `0 0 0 2px ${nodeTypeColor}20`,
      },
      '&:hover': {
        borderColor: nodeTypeColor,
      }
    };
  }
};
