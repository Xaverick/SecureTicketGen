import './App.css';
import Auth from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import Welcome from './Pages/welcome/Welcome';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AppContext from "./utils/context";
import TickectPage from './Pages/TickectPage/TickectPage';
import PrivateRoutes from './utils/PrivateRoute'
import { useEffect } from 'react';
const { Context } = require('./utils/context');


function App() {

  useEffect(() => {
    const loginTime = localStorage.getItem('loginTime');
    
    if (loginTime) {
      const currentTime = new Date();
      const elapsedMilliseconds = currentTime - parseInt(loginTime, 10);
      const elapsedHours = elapsedMilliseconds / (60 * 60 * 1000);
      
      // Check if one hour has passed since login
      if (elapsedHours > 1) {
        localStorage.removeItem('loginTime');
        localStorage.removeItem('user');
      }
    }

  })

  return (
    <BrowserRouter>
      <AppContext>
        <div>
          <Routes>

            <Route path="/" element={<Welcome />} />
            <Route path="/auth" element={<Auth />} />

            <Route element={<PrivateRoutes />}>     
              <Route path="/ticketpage" element={<TickectPage />} />
              <Route path="/home" element={<Home />} />
            </Route>

          </Routes>
        </div>
      </AppContext>
    </BrowserRouter>

  );
}

export default App;
