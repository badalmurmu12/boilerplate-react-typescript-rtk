import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store, persistor } from './store';
import { theme } from './theme';
import Counter from './components/Counter';
import Posts from './components/Posts';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Counter />
            <Posts />
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
