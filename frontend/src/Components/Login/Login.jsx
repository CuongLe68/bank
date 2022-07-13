import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from 'react-redux'
import Footer from "../Footer/Footer";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [capcha, setCapcha] = useState('');
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        //Không cho load lại trang
        e.preventDefault();

        //lưu username và password người dùng nhập vào và object newUser
        const newUser = {
            username: username,
            password: password,
        };

        //Xử lý đăng nhập
        if(capcha.length === 5 ) {
            loginUser(newUser, dispatch, navigate );
        }
        else {
            alert('Mã capcha không đúng')
        }

    }

    //Xử lý hiển thị hoặc tắt show password (toggle password)
    const handleShow = () => {
        setShow(!show)
        if(show) {
            document.querySelector('.login-password').type = 'text'
        }
        if(!show) {
            document.querySelector('.login-password').type = 'password'
        }
    }

    return ( 
        <>
            <section className="login-container">
                <img src="https://vcbdigibank.vietcombank.com.vn/assets/images/logo-white.svg" alt="logo" className="logo-white"/>
                <div>
                    <img className="login-header-logo" src="https://vcbdigibank.vietcombank.com.vn/assets/images/logo-digibank.svg" alt="logo" />
                    <div className="login-title">Kính chào Quý khách</div>
                    <div className="login-des">
                        <p>- Với khách hàng đã có tài khoản VCB Digibank :
                            <b style={{display: 'block'}}>Tên đăng nhập là số điện thoại đăng ký dịch vụ</b>
                            - Với khách hàng chưa có tài khoản VCB Digibank:
                            <b style={{display: 'block'}}>Tên đăng nhập là Tên đăng nhập VCB-iB@nking,</b>
                            để thực hiện chuyển đổi sang dịch vụ VCB Digibank mới.
                        </p>
                        <label className="login-toggle">Thu gọn</label>
                    </div>
                    <form className="login-form" onSubmit={handleLogin}>
                        <input className="login-username" type="text" placeholder="Tên đăng nhập" onChange={(e) => setUsername(e.target.value)} />
                        <div style={{display: 'inline-flex', width: '100%'}}>
                            <input className="login-password" type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                            <img className="login-password-icon" src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/dark/ic_eye-open.svg" alt="" onClick={() => handleShow()}/>
                        </div>
                        <div className="login-check">
                            <input className="login-check-input" type='number' placeholder='Mã kiểm tra' onChange={(e) => setCapcha(e.target.value)}/>
                            <img className="login-check-capcha" src="https://vcbdigibank.vietcombank.com.vn/w1/get-captcha/262d13a7-5d1a-a235-cd26-e22e4a298a71" alt="" />
                            <img className="login-check-refresh" src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/dark/ic_reload.svg" alt="" />
                        </div>
                        <button className="login-btn-submit" type="submit">Đăng nhập</button>
                    </form>
                    <div className="login-footer">
                        <div>
                            <a className="login-footer-repass" href="/login">Quên mật khẩu?</a>
                        </div>
                        <a className="login-footer-help" href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/chuyen-doi-ib.pdf">Hướng dẫn chuyển đổi sang CVB Digibank</a>
                        <div>
                            <Link className="login-register-link" to="/register">Đăng ký miễn phí ngay</Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
     );
}
 
export default Login;