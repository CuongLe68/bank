import './navbar.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../createInstance';
import { logOutSuccess } from '../../redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faComment, faHome, faRightToBracket, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function Navbar() {
    const user = useSelector((state) => state.auth.login?.currentUser); //lấy user ra
    const accessToken = user?.accessToken;
    const id = user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    const [show, setShow] = useState(false);

    //xử lý đăng xuất
    const handleLogout = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    };

    useEffect(() => {
        if (show === true) {
            document.getElementsByClassName('navbar-container')[0].style.width = '69px';
            document.getElementsByClassName('navbar-container-logo')[0].style.display = 'none';
            document.getElementsByClassName('navbar-container-home')[0].style.marginTop = '30px';
            document.getElementsByClassName('navbar-container-menu-icon')[0].style.right = '16px';
        } else {
            document.getElementsByClassName('navbar-container')[0].style.width = '300px';
            document.getElementsByClassName('navbar-container-logo')[0].style.display = 'flex';
            document.getElementsByClassName('navbar-container-home')[0].style.marginTop = '0';
            document.getElementsByClassName('navbar-container-menu-icon')[0].style.right = '18px';
        }
        // eslint-disable-next-line
    }, [show]);

    return (
        <div className="navbar-container">
            <div className="navbar-container-menu" onClick={() => setShow(!show)}>
                <FontAwesomeIcon className="navbar-container-menu-icon" icon={faBars} />
            </div>
            <Link to="/trangchu" className="navbar-container-logo">
                <div className="navbar-container-logo-icon">VCBDigiBank</div>
            </Link>

            <Link to="/trangchu" className="navbar-container-home navbar-container-before navbar-container-after">
                <FontAwesomeIcon className="navbar-container-icon" icon={faHome} />
                <div className="navbar-container-home-title">Trang chủ</div>
            </Link>

            <Link
                to="/trangchu/quan-li-nguoi-dung"
                className="navbar-container-users navbar-container-before navbar-container-after"
            >
                <FontAwesomeIcon className="navbar-container-icon" icon={faUsers} />
                <div className="navbar-container-users-title">Quản lý người dùng</div>
            </Link>

            <Link
                to="/trangchu/tin-nhan"
                className="navbar-container-message navbar-container-before navbar-container-after"
            >
                <FontAwesomeIcon className="navbar-container-icon" icon={faComment} />
                <div className="navbar-container-message-title">Tin nhắn</div>
            </Link>

            <Link
                to="/trangchu/thong-bao"
                className="navbar-container-nofication navbar-container-before navbar-container-after"
            >
                <FontAwesomeIcon className="navbar-container-icon" icon={faBell} />
                <div className="navbar-container-nofication-title">Thông báo</div>
            </Link>

            <Link
                to="/"
                className="navbar-container-logout navbar-container-before navbar-container-after"
                onClick={handleLogout}
            >
                <FontAwesomeIcon className="navbar-container-icon" icon={faRightToBracket} />
                <div className="navbar-container-nofication-title">Đăng xuất</div>
            </Link>
        </div>
    );
}

export default Navbar;
