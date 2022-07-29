import { Link } from 'react-router-dom';
import './navbar.css';
import { useSelector } from 'react-redux';
import { logOut } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../createInstance';
import { logOutSuccess } from '../../redux/authSlice';

const NavBar = () => {
    const user = useSelector((state) => state.auth.login.currentUser); //lấy auth từ redux/store.js
    const accessToken = user?.accessToken;
    const id = user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    const handleLogout = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    };

    return (
        <nav className="navbar-container">
            {user ? (
                <Link to="/" className="navbar-logout" onClick={handleLogout}>
                    ĐĂNG XUẤT
                </Link>
            ) : (
                <>
                    <Link to="/" className="navbar-login">
                        ĐĂNG NHẬP
                    </Link>
                    <Link to="/register" className="navbar-register">
                        ĐĂNG KÝ
                    </Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;
