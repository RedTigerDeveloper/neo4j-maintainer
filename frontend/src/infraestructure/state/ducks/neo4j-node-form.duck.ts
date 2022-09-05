import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NodeProperties } from '../shared/node-properties.state';


export interface Neo4jNodeFormState {
  node: string;
  nodeName: string;
  nodeLabels: string[];
  properties: NodeProperties[];
}

const initialState: Neo4jNodeFormState = {
    node: '',
    nodeName: '',
    nodeLabels: [],
    properties: []
}

export const neo4jNodeForm = createSlice({
  name: 'neo4jNodeForm',
  initialState,
  reducers: {
    setNode:(state, action: PayloadAction<string>) => {
      state.node = action.payload
   }, 
    setNodeName: (state, action: PayloadAction<string>) => {
       state.nodeName = action.payload
    },
    setNodeLabels: (state, action: PayloadAction<string[]>) => {
      state.nodeLabels = action.payload
    },
    setProperties: (state, action: PayloadAction<NodeProperties[]>) => {
      state.properties = action.payload
    },
    addNodeProperties: (state, action: PayloadAction<NodeProperties>) => {
      const properties = state.properties.filter(p => p.key !== action.payload.key)
      state.properties = [
        ...properties,
        action.payload
      ]
    },
    resetNodeProperties: (state) => {
      state.properties = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { setNodeName, setNodeLabels, setNode, addNodeProperties, resetNodeProperties, setProperties } = neo4jNodeForm.actions

export default neo4jNodeForm.reducer
