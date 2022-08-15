import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AdminHome from './Components/AdminHome/AdminHome'; //trang chủ

//Admin
import AdminUsers from './Components/AdminUsers/AdminUsers';
import Messages from './Components/Messages/Messages';
import Notification from './Components/Notification/Notification';

//chức năng client
import Banking from './Modules/Banking/Banking';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/trangchu" element={<AdminHome />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* admin */}
                    <Route path="/trangchu/quan-li-nguoi-dung" element={<AdminUsers />} />
                    <Route path="/trangchu/tin-nhan" element={<Messages />} />
                    <Route path="/trangchu/thong-bao" element={<Notification />} />

                    {/* client */}
                    <Route path="/chuyentien" element={<Banking />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
