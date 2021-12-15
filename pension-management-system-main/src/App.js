
import './App.css';
import Header from './components/Header';

import PensionerData from './components/PensionerData';
import Hello from './components/Hello';

function App() {
  return (
    <div className="App">
     <Header/>
    
     <PensionerData/>
     <Hello/>
    </div>
  );
}

export default App;
