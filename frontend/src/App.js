import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import HomePage from './Components/Home/HomePage'; //trang chủ

//chức năng
import Banking from './Modules/Banking/Banking';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/trangchu" element={<HomePage />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/chuyentien" element={<Banking />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
