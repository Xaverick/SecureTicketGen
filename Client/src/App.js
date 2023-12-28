
import './App.css';
import Auth from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />  
        </Routes>  
      </div>
    </BrowserRouter>

  );
}

export default App;
