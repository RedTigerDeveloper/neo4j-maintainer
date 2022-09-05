import { configureStore } from '@reduxjs/toolkit'
import neo4jNodeForm from './ducks/neo4j-node-form.duck';
import neo4jRelationshipForm from './ducks/neo4j-relationship-form.duck';
import uiReducer from './ducks/ui.duck';

export const store = configureStore({
  reducer: {
      ui: uiReducer,
      neo4jNodeForm: neo4jNodeForm,
      neo4jRelationshipForm: neo4jRelationshipForm
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch