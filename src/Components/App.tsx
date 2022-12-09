import './App.css';
import Button from '@mui/material/Button';
import MaterialUIProvider from '../MaterialUI/MaterialUIProvider';

function App() {
  return (
    <div className="App">
      <MaterialUIProvider>
        <Button variant="contained">Hello World</Button>
      </MaterialUIProvider>
    </div>
  );
}

export default App;
