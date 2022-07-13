import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from './Components/Register/Register'
import HomePage from "./Components/Home/HomePage"; //trang chủ
import NavBar from './Components/NavBar/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
