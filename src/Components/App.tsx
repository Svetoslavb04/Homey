import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import MaterialUIProvider from './Core/MaterialUI'; //Everything provided by MUI
import { PubSubProvider } from '../contexts/PubSubContext';
import { AuthProvider } from '../contexts/AuthContext';

import Layout from './Core/Layout'; //Page layout

function App() {
  return (
    <MaterialUIProvider>
      <PubSubProvider>
        <AuthProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </AuthProvider>
      </PubSubProvider>
    </MaterialUIProvider>
  );
}

export default App;
