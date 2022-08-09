import './Header.css';
import { useSelector } from 'react-redux';
import { logOut } from '../../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../../createInstance';
import { logOutSuccess } from '../../../redux/authSlice';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//socket.io
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000'); //kết nối tới server socket

function Header() {
    const [show, setShow] = useState(false);

    const user = useSelector((state) => state.auth.login.currentUser); //lấy auth từ redux/store.js
    const accessToken = user?.accessToken;
    const id = user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    //Xử lý phần đăng xuất
    const handleLogout = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    };

    //Xử lý phần toggle tiền
    const handleShow = () => {
        setShow(!show);
        if (!show) {
            document.querySelector('.info-card-wrapper-footer-money').innerHTML = `********* VND`;
        } else {
            document.querySelector('.info-card-wrapper-footer-money').innerHTML = `${user.currentmoney} VND`;
        }
    };

    //socket.io
    useEffect(() => {
        socket.on(`${String(user.numberCard)}`, (data) => {
            alert(`${data.name} đã chuyển cho bạn ${data.money} VND với nội dung: ${data.message}`);
        });
        // eslint-disable-next-line
    }, [socket]);

    return (
        <div>
            <div className="user-navbar">
                <Link to="/trangchu" className="user-navbar-top-home user-navbar-top-item">
                    <img
                        className="user-navbar-home-icon"
                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_home-border.svg"
                        alt="trang chủ"
                    />
                </Link>
                <div className="user-navbar-top-utilities user-navbar-top-item">
                    <img
                        className="user-navbar-icon"
                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_tien-ich.svg"
                        alt="tiện ích"
                    />
                </div>
                <div className="user-navbar-top-setting user-navbar-top-item">
                    <img
                        className="user-navbar-icon"
                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_caidat.svg"
                        alt="cài đặt"
                    />
                </div>
                <div className="user-navbar-top-rewards user-navbar-top-item">
                    <img
                        className="user-navbar-icon"
                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/other/ic-loyalty-white.svg"
                        alt="phần thưởng"
                    />
                </div>
                <div className="user-navbar-bottom-contact user-navbar-top-item">
                    <img
                        className="user-navbar-icon"
                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_lien-he.svg"
                        alt="Liên hệ"
                    />
                </div>
                <div className="user-navbar-bottom-language user-navbar-top-item">
                    <img
                        className="user-navbar-icon"
                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/img/flag.png"
                        alt="ngôn ngữ"
                    />
                </div>
                <Link className="user-navbar-bottom-logout user-navbar-top-item" to="/" onClick={handleLogout}>
                    <img
                        className="user-navbar-icon"
                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_thoat.svg"
                        alt="thoát"
                    />
                </Link>
            </div>
            {/* InFo */}
            <div className="user-info">
                <img
                    className="user-info-logo"
                    src="https://vcbdigibank.vietcombank.com.vn/assets/images/logo-digibank-white.svg"
                    alt="logo"
                />
                <div className="user-info-user">
                    <div className="user-image">
                        <img
                            src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                            alt=""
                        />
                    </div>
                    <div className="user-hi">Xin chào</div>
                    <div className="user-name">{user.name}</div>
                    <div className="user-dec">
                        Lần đăng nhập gần nhất
                        <br />
                        2022-07-15 1:20:21
                    </div>
                </div>
                <div className="user-info-card">
                    <div className="info-card-title1">
                        <div className="info-card-title1-dec">Danh sách tài khoản/thẻ</div>
                        <Link to="/trangchu" className="info-card-title1-link">
                            Chi tiết
                        </Link>
                    </div>
                    <div className="info-card-title2">
                        <div className="info-card-title2-dec">Mở tài khoản số chọn</div>
                        <Link to="/trangchu" className="user-info-icon-right user-info-icon-right-after">
                            <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0LjQxNCcgaGVpZ2h0PSc2LjgyOCc+PHBhdGggZGF0YS1uYW1lPSdQYXRoIDU2MycgZD0nTTEuNDEgMS40MTRsMiAyLTIgMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjNzJiZjAwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMicvPjwvc3ZnPg=="
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="info-card-wrapper">
                        <div className="info-card-wrapper-title">Tài khoản thanh toán</div>
                        <div className="info-card-wrapper-detail">
                            <div className="info-card-wrapper-number">{user.numberCard}</div>
                            <Link to="/trangchu" className="user-info-icon-right">
                                <img
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0LjQxNCcgaGVpZ2h0PSc2LjgyOCc+PHBhdGggZGF0YS1uYW1lPSdQYXRoIDU2MycgZD0nTTEuNDEgMS40MTRsMiAyLTIgMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjNzJiZjAwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMicvPjwvc3ZnPg=="
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="info-card-wrapper-footer">
                            <div className="info-card-wrapper-footer-title">Số dư</div>
                            <div className="info-card-wrapper-footer-icon">
                                <img
                                    onClick={() => handleShow()}
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PScxNic+PGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBzdHJva2U9JyM3MkJGMDAnPjxwYXRoIGQ9J00xMC4zNDMgNy40NTNhMi4zNyAyLjM3IDAgMTEtNC43NCAwIDIuMzcgMi4zNyAwIDAxNC43NCAweicvPjxwYXRoIGQ9J00xNC4zODcgNy40NTNzLTIuODcxIDQuMjU1LTYuNDEzIDQuMjU1Yy0zLjU0MiAwLTYuNDE0LTQuMjU1LTYuNDE0LTQuMjU1czIuODctNC4yNTUgNi40MTQtNC4yNTVjMy41NDIgMCA2LjQxMyA0LjI1NSA2LjQxMyA0LjI1NXonLz48L2c+PC9zdmc+"
                                    alt=""
                                />
                                <div className="info-card-wrapper-footer-money">********* VND</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-info-contact">
                    <div className="user-info-contact-icon">
                        <img
                            src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/primary/ic_phone-hotline.svg"
                            alt=""
                        />
                    </div>
                    <div className="user-info-contact-title">
                        <div className="user-info-contact-title-dec">Dịch vụ khách hàng 24/7</div>
                        <div className="user-info-contact-title-phone">1900 54 54 13</div>
                    </div>
                </div>
                <div className="user-info-footer">
                    <div className="user-info-footer-item">
                        <div className="user-info-footer-item-icon">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_trasoatonline.svg"
                                alt=""
                            />
                        </div>
                        <div className="user-info-footer-item-title">Tra soát trực tuyến</div>
                        <Link to="/trangchu" className="user-info-icon-bottom">
                            <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc3JyBoZWlnaHQ9JzQnPjxwYXRoIGRhdGEtbmFtZT0nUGF0aCAzOTEnIGQ9J002LjE0Ni4xNDZhLjUuNSAwIDAxLjcwOC43MDhsLTMgM2EuNS41IDAgMDEtLjY5Mi4wMTVsLTMtMi43NUEuNS41IDAgMDEuODM4LjM4MWwyLjY0NyAyLjQyN3onIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsMC43KScvPjwvc3ZnPg=="
                                alt=""
                            />
                        </Link>
                    </div>

                    <div className="user-info-footer-item" style={{ marginTop: 20 }}>
                        <div className="user-info-footer-item-icon">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_doingoaite.svg"
                                alt=""
                            />
                        </div>
                        <div className="user-info-footer-item-title">Tra cứu tỉ giá ngoại tệ</div>
                        <Link to="/trangchu" className="user-info-footer-item-right">
                            <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0LjQxNCcgaGVpZ2h0PSc2LjgyOCc+PHBhdGggZGF0YS1uYW1lPSdQYXRoIDU2MycgZD0nTTEuNDEgMS40MTRsMiAyLTIgMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjNzJiZjAwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMicvPjwvc3ZnPg=="
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="user-info-footer-item" style={{ marginTop: 20 }}>
                        <div className="user-info-footer-item-icon">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_lai-tiet-kiem.svg"
                                alt=""
                            />
                        </div>
                        <div className="user-info-footer-item-title">Tính lãi tiết kiệm</div>
                        <Link to="/trangchu" className="user-info-footer-item-right">
                            <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0LjQxNCcgaGVpZ2h0PSc2LjgyOCc+PHBhdGggZGF0YS1uYW1lPSdQYXRoIDU2MycgZD0nTTEuNDEgMS40MTRsMiAyLTIgMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjNzJiZjAwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMicvPjwvc3ZnPg=="
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="user-info-footer-item" style={{ marginTop: 20, paddingBottom: 0, border: 'none' }}>
                        <div className="user-info-footer-item-icon">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_calendar.svg"
                                alt=""
                            />
                        </div>
                        <div className="user-info-footer-item-title">Tính lịch trả nợ</div>
                        <Link to="/trangchu" className="user-info-footer-item-right" style={{ bottom: 2 }}>
                            <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0LjQxNCcgaGVpZ2h0PSc2LjgyOCc+PHBhdGggZGF0YS1uYW1lPSdQYXRoIDU2MycgZD0nTTEuNDEgMS40MTRsMiAyLTIgMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjNzJiZjAwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMicvPjwvc3ZnPg=="
                                alt=""
                            />
                        </Link>
                    </div>
                </div>
            </div>
            {/* Header */}
            <div className="user-header-navbar">
                <div className="user-header-navbar-wrapper">
                    <Link to="/trangchu" className="user-header-navbar-wrapper-logo">
                        <img src="https://vcbdigibank.vietcombank.com.vn/assets/images/logo-white-type-2.svg" alt="" />
                    </Link>
                    <div className="user-header-navbar-wrapper-search">
                        <input className="user-header-navbar-input" placeholder="Tìm kiếm trong VCB Digibank" />
                        <img
                            className="user-header-navbar-wrapper-icon"
                            src="https://vcbdigibank.vietcombank.com.vn/assets/images/base/icons/search/square/white.svg"
                            alt="search"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
