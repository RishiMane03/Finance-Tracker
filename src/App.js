import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard';
import AboutUs from './Components/AboutUs/aboutUs';
import InfoPage from './Components/Info/info';
import LandingPage from './Components/LandingPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      
      <ToastContainer />

      <Router>
          <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path='/info' element={<InfoPage/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/dashboard' element={<Dashboard  isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
