import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import MaterialUIProvider from './Core/MaterialUI'; //Everything provided by MUI
import { PubSubProvider } from '../contexts/PubSubContext'; //Everything provided by MUI
import Layout from './Core/Layout'; //Page layout

function App() {
  return (
    <MaterialUIProvider>
      <PubSubProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </PubSubProvider>
    </MaterialUIProvider>
  );
}

export default App;
