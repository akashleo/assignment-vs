// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

// Helper function to log state changes
const logStateChange = (action, state) => {
  console.group(`🔄 State Update: ${action}`);
  console.log('Nodes:', state.nodes.length);
  console.log('Edges:', state.edges.length);
  console.log('Current State:', {
    nodes: state.nodes,
    edges: state.edges,
    nodeIDs: state.nodeIDs
  });
  console.groupEnd();
};

// Helper function to persist state to localStorage
const persistState = (state) => {
  try {
    const stateToSave = {
      nodes: state.nodes,
      edges: state.edges,
      nodeIDs: state.nodeIDs || {},
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('vectorshift-flow-state', JSON.stringify(stateToSave));
  } catch (error) {
    console.error('Failed to persist state:', error);
  }
};

// Helper function to load state from localStorage
const loadPersistedState = () => {
  try {
    const saved = localStorage.getItem('vectorshift-flow-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('📥 Loaded persisted state from:', parsed.timestamp);
      return {
        nodes: parsed.nodes || [],
        edges: parsed.edges || [],
        nodeIDs: parsed.nodeIDs || {}
      };
    }
  } catch (error) {
    console.error('Failed to load persisted state:', error);
  }
  return {
    nodes: [],
    edges: [],
    nodeIDs: {}
  };
};

export const useStore = create((set, get) => {
  const initialState = loadPersistedState();
  
  return {
    nodes: initialState.nodes,
    edges: initialState.edges,
    nodeIDs: initialState.nodeIDs,
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        const newState = {
            nodes: [...get().nodes, node]
        };
        set(newState);
        const state = get();
        logStateChange('ADD_NODE', state);
        persistState(state);
    },
    onNodesChange: (changes) => {
      const newState = {
        nodes: applyNodeChanges(changes, get().nodes),
      };
      set(newState);
      const state = get();
      logStateChange('NODES_CHANGE', state);
      persistState(state);
    },
    onEdgesChange: (changes) => {
      const newState = {
        edges: applyEdgeChanges(changes, get().edges),
      };
      set(newState);
      const state = get();
      logStateChange('EDGES_CHANGE', state);
      persistState(state);
    },
    onConnect: (connection) => {
      const newEdge = {
        ...connection,
        type: 'default', // Use default React Flow edge
        animated: false,
        markerEnd: { type: MarkerType.ArrowClosed },
      };
      const newState = {
        edges: addEdge(newEdge, get().edges),
      };
      set(newState);
      const state = get();
      logStateChange('CONNECT', state);
      persistState(state);
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      const newState = {
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      };
      set(newState);
      const state = get();
      logStateChange('UPDATE_NODE_FIELD', state);
      persistState(state);
    },
    
    // Clear persisted state
    clearPersistedState: () => {
      localStorage.removeItem('vectorshift-flow-state');
      console.log('🗑️ Cleared persisted state');
    },
    
    // Reset to empty state
    resetState: () => {
      const emptyState = {
        nodes: [],
        edges: [],
        nodeIDs: {}
      };
      set(emptyState);
      logStateChange('RESET_STATE', emptyState);
      persistState(emptyState);
    },
  };
});
