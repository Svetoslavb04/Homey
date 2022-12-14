import './App.css';

import { BrowserRouter } from 'react-router-dom';

import MaterialUIProvider from './Core/MaterialUI'; //Everything provided by MUI

function App() {
  return (
    <div className="App">
      <MaterialUIProvider>
        <BrowserRouter>
        </BrowserRouter>
      </MaterialUIProvider>
    </div>
  );
}

export default App;
