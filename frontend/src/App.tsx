import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import PersistentDrawer from './infraestructure/presentation/shared/components/PersistentDrawer';
import { Provider } from 'react-redux'
import { store } from './infraestructure/state/store';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <PersistentDrawer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
