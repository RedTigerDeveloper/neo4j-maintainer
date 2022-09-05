import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NodeProperties } from '../shared/node-properties.state';

export interface Neo4jRelationshipFormState {
  name: string;
  nodeA: string;
  nodeB: string;
  properties: NodeProperties[];
}

const initialState: Neo4jRelationshipFormState = {
  name: '',
  nodeA: '',
  nodeB: '',
  properties: []
}

export const neo4jRelationshipForm = createSlice({
  name: 'neo4jRealationshipForm',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setNodeA: (state, action: PayloadAction<string>) => {
      state.nodeA = action.payload
    },
    setNodeB: (state, action: PayloadAction<string>) => {
      state.nodeB = action.payload
    },
    setProperties: (state, action: PayloadAction<NodeProperties[]>) => {
      state.properties = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setName, setNodeA, setNodeB, setProperties } = neo4jRelationshipForm.actions

export default neo4jRelationshipForm.reducer
