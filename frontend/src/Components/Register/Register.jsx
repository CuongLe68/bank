import { useState } from 'react';
import { registerUser } from '../../redux/apiRequest';
import './register.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [reshow, setReShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const hanldeRegister = (e) => {
        e.preventDefault();

        const newUser = {
            email: email,
            name: name,
            username: username,
            password: password,
        };

        registerUser(newUser, dispatch, navigate);
    };

    //Xử lý hiển thị hoặc tắt show password (toggle password)
    const handleShow = () => {
        setShow(!show);
        if (show) {
            document.querySelector('.logout-password').type = 'text';
        }
        if (!show) {
            document.querySelector('.logout-password').type = 'password';
        }
    };

    //toggle Re password
    const handleReShow = () => {
        setReShow(!reshow);
        if (reshow) {
            document.querySelector('.logout-rePassword').type = 'text';
        }
        if (!reshow) {
            document.querySelector('.logout-rePassword').type = 'password';
        }
    };

    //
    const handeleCheckpass = (pass) => {
        if (pass !== password) {
            alert('Mật Khẩu không khớp');
        }
    };

    return (
        <>
            <img
                src="https://vcbdigibank.vietcombank.com.vn/assets/images/logo-white.svg"
                alt="logo"
                className="logo-white"
            />
            <div>
                <section className="register-container">
                    <img
                        className="logout-header-logo"
                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/logo-digibank.svg"
                        alt="logo"
                    />
                    <div className="logout-title">Kính chào Quý khách</div>
                    <div className="logout-des">
                        <p>
                            - Với khách hàng đã có tài khoản VCB Digibank :
                            <b style={{ display: 'block' }}>Tên đăng nhập là số điện thoại đăng ký dịch vụ</b>- Với
                            khách hàng chưa có tài khoản VCB Digibank:
                            <b style={{ display: 'block' }}>Tên đăng nhập là Tên đăng nhập VCB-iB@nking,</b>
                            để thực hiện chuyển đổi sang dịch vụ VCB Digibank mới.
                        </p>
                        <label className="logout-toggle">Thu gọn</label>
                    </div>
                    <form onSubmit={hanldeRegister}>
                        <input
                            className="logout-input"
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="logout-input"
                            type="text"
                            placeholder="Tên (vd: LE VAN A)"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="logout-input"
                            type="number"
                            placeholder="Số điện thoại đăng nhập"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div style={{ display: 'inline-flex', width: '100%' }}>
                            <input
                                className="logout-input logout-password"
                                type="password"
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <img
                                className="logout-password-icon"
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/dark/ic_eye-open.svg"
                                alt=""
                                onClick={() => handleShow()}
                            />
                        </div>
                        <div style={{ display: 'inline-flex', width: '100%' }}>
                            <input
                                className="logout-input logout-rePassword"
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                onBlur={(e) => handeleCheckpass(e.target.value)}
                            />
                            <img
                                className="logout-password-icon"
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/dark/ic_eye-open.svg"
                                alt=""
                                onClick={() => handleReShow()}
                            />
                        </div>
                        <button className="logout-btn-submit" type="submit">
                            Đăng ký
                        </button>
                    </form>
                    <div className="logout-footer">
                        <div>
                            <Link className="logout-register-link" to="/">
                                Đăng nhập ngay
                            </Link>
                        </div>
                        <a
                            className="logout-footer-help"
                            href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/chuyen-doi-ib.pdf"
                        >
                            Hướng dẫn chuyển đổi sang CVB Digibank
                        </a>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Register;
