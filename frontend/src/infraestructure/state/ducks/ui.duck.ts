import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
  dashboardTitle: string;
}

const initialState: UiState = {
  dashboardTitle: 'Developer factory',
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDashboardTitle: (state, action: PayloadAction<string>) => {
        state.dashboardTitle = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDashboardTitle } = uiSlice.actions

export default uiSlice.reducer
