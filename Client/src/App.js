import './App.css';
import Auth from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import Welcome from './Pages/welcome/Welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppContext from "./utils/context";
import TickectPage from './Pages/TickectPage/TickectPage';
import PrivateRoutes from './utils/PrivateRoute'


function App() {





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
