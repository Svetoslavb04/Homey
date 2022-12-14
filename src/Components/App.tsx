import './App.css';

import { BrowserRouter } from 'react-router-dom';

import MaterialUIProvider from './Core/MaterialUI'; //Everything provided by MUI
import Layout from './Core/Layout'; //Page layout

function App() {
  return (
    <div className="App">
      <MaterialUIProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </MaterialUIProvider>
    </div>
  );
}

export default App;
