import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import OtpPage from './pages/otpPage';

function App() {
  return (
    <div className="App">
        <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/otp" element={<OtpPage/>}/>
                </Routes>
        </Router>
    </div>
  );
}

export default App;
