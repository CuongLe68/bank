import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../Config/Footer/Footer';
import Header from '../Config/Header/Header';
import './Banking.css';

//socket.io
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000'); //kết nối tới server socket

function Banking() {
    const user = useSelector((state) => state.auth.login.currentUser); //import user
    const [nameRecive, setNameRecive] = useState(''); // thông tin người gửi
    const [infoSend, setInfoSend] = useState(user.numberCard); // thông tin người gửi
    const [infoRecive, setInfoRecive] = useState(null); //thông tin người nhận
    const [money, setMoney] = useState(null); //số tiền muốn chuyển
    const [fee, setFee] = useState('Người chuyển trả'); //phí chuyển
    const [valueMsg, setvalueMsg] = useState(`${user.name} chuyen khoan`); //Nội dung

    const [capcha, setCapcha] = useState(''); //mã capcha
    const [showConfirm, setShowConfirm] = useState(false); // hiển thị form xác nhận
    const [showResult, setShowResult] = useState(false); // hiển thị form xác nhận

    //thông báo khi click vào Mẫu chuyển tiền
    const handleDemo = () => {
        const err = document.getElementById('err');

        err.classList.add('err');
        err.innerHTML = `
            <div class="err-box">
                <div class="err-box-header">
                    <div class="err-box-header-icon">
                        <img
                            src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='23.068'%3E%3Cg fill='none' stroke='%23fff' stroke-miterlimit='10' stroke-width='4'%3E%3Cpath data-name='Line 2' d='M2 0v17.068'/%3E%3Cpath data-name='Line 2 Copy' d='M2 20v3.068'/%3E%3C/g%3E%3C/svg%3E"
                            alt="cong"
                        />
                    </div>
                    <div class="err-box-header-desc">Quý khách không có mẫu chuyển tiền đã lưu</div>
                </div>
                <button class="err-box-btn">
                    <a href='/chuyentien'>Đóng</a>
                </button>
            </div>
        `;
    };

    //check người trả
    const isChecked = (index) => {
        if (index === 1) {
            setFee('Người chuyển trả');
            document.querySelector('.banking-content-check-box-col2-check').checked = false;
        } else {
            setFee('Người nhận trả');
            document.querySelector('.banking-content-check-box-col1-check').checked = false;
        }
    };

    let today = new Date();
    let hours = today.getHours(); //lấy giờ
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minute = today.getMinutes(); //lấy phút
    if (minute < 10) {
        minute = `0${minute}`;
    }
    let date = today.getDate(); //lấy ngày
    let month = today.getMonth() + 1; //lấy tháng
    let year = today.getFullYear(); //lấy năm
    let day; //lấy thứ
    switch (today.getDay()) {
        case 1:
            day = 'Thứ Hai';
            break;
        case 2:
            day = 'Thứ Ba';
            break;
        case 3:
            day = 'Thứ Tư';
            break;
        case 4:
            day = 'Thứ Năm';
            break;
        case 5:
            day = 'Thứ Sáu';
            break;
        case 6:
            day = 'Thứ Bảy';
            break;
        case 0:
            day = 'Chủ nhật';
            break;
        default:
            break;
    }
    let currentTime = `${hours}:${minute} ${day} ${date}/${month}/${year}`; //tạo thời gian
    let curentCode = Math.floor(Math.random() * 10000000000); //tạo mã giao dịch
    if (curentCode < 1000000000) {
        curentCode = curentCode * 10;
    }

    let formSubmit = {
        name: user.name,
        infoSend: infoSend,
        infoRecive: infoRecive,
        money: Number(money),
        fee: fee,
        message: valueMsg,
        code: curentCode,
        time: currentTime,
    };

    //thông báo chuyển tiền thành công hoặc có lỗi
    useEffect(() => {
        socket.on('server-send-check-success', (data) => {
            setNameRecive(data.nameRecive);
            setShowConfirm(true);
        });
        socket.on('server-send-check-false', (msg) => {
            alert(msg);
        });
        socket.on('server-send-money-success', (data) => {
            document.getElementsByClassName('banking-confirm-item-index index3')[0].classList.add('active');
            document.getElementsByClassName('banking-confirm')[0].classList.remove('active-50');
            document.getElementsByClassName('banking-confirm')[0].classList.add('active-100');
            setShowResult(true);
        });
    }, []);

    //xử lí chuyển tiền
    const handleSubmit = () => {
        if (capcha.length !== 5) {
            alert('Lỗi: Vui lòng nhập mã kiểm tra');
        } else {
            socket.emit('client-send-money', formSubmit);
        }
    };

    //Xử lý quay lại trang trước
    const handlePrev = () => {
        setShowConfirm(false);
        document.getElementsByClassName('banking-confirm-item-index index2')[0].classList.remove('active');
        document.getElementsByClassName('banking-confirm')[0].classList.remove('active-50');
    };

    //xử lý chuyển đến form xác nhận
    const handleNext = () => {
        if (infoRecive === null) {
            alert('Lỗi: vui lòng nhập thông tin người hưởng!');
        } else {
            if (money === null || money <= 0) {
                alert('Lỗi: Vui lòng nhập số tiền muốn gửi!');
            }
        }
        if (infoRecive !== null && money > 0) {
            document.getElementsByClassName('banking-confirm-item-index index2')[0].classList.add('active');
            document.getElementsByClassName('banking-confirm')[0].classList.add('active-50');

            //gửi thông tin lên server
            socket.emit('client-send-check', formSubmit);
        }
    };
    return (
        <>
            <div id="err"></div>
            <section className="container">
                <Header />

                {/* content */}
                <div className="banking-container">
                    <div className="banking-title">
                        <h2>Chuyển tiền trong Vietcombank</h2>
                        <div className="banking-link">
                            <Link to="/trangchu" style={{ marginRight: 10 }}>
                                Trang chủ
                            </Link>{' '}
                            {` > `}{' '}
                            <Link to="/chuyentien" style={{ margin: '0 10px' }}>
                                Chuyển tiền
                            </Link>{' '}
                            {` > `} <span className="banking-title-current">Chuyển tiền trong Vietcombank</span>
                        </div>
                    </div>

                    <div className="banking-confirm">
                        <div className="banking-confirm-item">
                            <div className="banking-confirm-item-index index1 active">1</div>
                            <div className="banking-confirm-item-desc">Khởi tạo</div>
                        </div>
                        <div className="banking-confirm-item">
                            <div className="banking-confirm-item-index index2" style={{ margin: 'auto' }}>
                                2
                            </div>
                            <div className="banking-confirm-item-desc">Xác nhận</div>
                        </div>
                        <div className="banking-confirm-item">
                            <div className="banking-confirm-item-index index3" style={{ marginLeft: 30 }}>
                                3
                            </div>
                            <div className="banking-confirm-item-desc" style={{ textAlign: 'end' }}>
                                Kết quả
                            </div>
                        </div>
                    </div>

                    {!showConfirm ? (
                        //giao diện
                        <div className="banking-container-form-create">
                            <div className="banking-desc">Mô tả và một số lưu ý đối với tính năng chuyển tiền </div>

                            <div className="banking-header">
                                <div className="banking-header-number">
                                    <div className="banking-header-number-title">Tài khoản nguồn</div>
                                    <select
                                        value={infoSend || ''}
                                        className="banking-header-number-section"
                                        onChange={(e) => setInfoSend(e.target.value)}
                                    >
                                        <option value={user.numberCard}>{user.numberCard} - VND</option>
                                        <option value="0909900009">0909900009 - VND</option>
                                    </select>
                                </div>
                                <div className="banking-header-money">
                                    <div className="banking-header-money-title">Số dư khả dụng</div>
                                    <div className="banking-header-money-curent">{user.currentmoney} VND</div>
                                </div>
                            </div>

                            {/* info */}
                            <div className="banking-info">
                                <div className="banking-info-add">
                                    <div className="banking-info-add-col-1">
                                        <div
                                            className="banking-info-add-col-1-desc"
                                            onClick={handleDemo} //để tạm
                                        >
                                            Thêm người nhận
                                        </div>
                                        <img
                                            className="banking-info-add-col-1-img"
                                            src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_addmore_green.svg"
                                            alt="cong"
                                            onClick={handleDemo} //để tạm
                                        />
                                    </div>
                                    <div className="banking-info-add-col-2" onClick={handleDemo}>
                                        Mẫu chuyển tiền
                                    </div>
                                </div>
                                <div className="banking-info-number">
                                    <div className="banking-info-number-title">Thông tin người hưởng</div>
                                    <input
                                        className="banking-info-number-input"
                                        type="text"
                                        placeholder="Nhập/ chọn tài khoản hưởng thụ VND"
                                        value={infoRecive || ''}
                                        onChange={(e) => setInfoRecive(e.target.value)}
                                    />
                                    <img
                                        className="banking-info-number-img"
                                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/dark/ic_contact.svg"
                                        alt="danhba"
                                    />
                                </div>
                            </div>

                            {/* content */}
                            <div className="banking-content">
                                <div className="banking-content-money">
                                    <div className="banking-content-money-title">Số tiền</div>
                                    <input
                                        className="banking-content-money-number"
                                        type="number"
                                        placeholder="Nhập số tiền"
                                        value={money || ''}
                                        onChange={(e) => setMoney(e.target.value)}
                                    />
                                    <div className="banking-content-money-vnd">VND</div>
                                </div>
                                <div className="banking-content-desc">
                                    <a href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/hanmucgiaodich-kh-canhan.html">
                                        Hạn mức
                                    </a>
                                </div>
                                <div className="banking-content-check">
                                    <div className="banking-content-check-title">Phí giao dịch</div>
                                    <div className="banking-content-check-box">
                                        <div className="banking-content-check-box-col1">
                                            <input
                                                className="banking-content-check-box-col1-check"
                                                type="radio"
                                                defaultChecked
                                                onClick={() => isChecked(1)}
                                            />
                                            <span className="banking-span-check">Người chuyển trả</span>
                                        </div>
                                        <div className="banking-content-check-box-col2">
                                            <input
                                                className="banking-content-check-box-col2-check"
                                                type="radio"
                                                onClick={isChecked}
                                            />
                                            <span className="banking-span-check">Người nhận trả</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="banking-content-value">
                                    <div className="banking-content-value-title">Nội dung</div>
                                    <input
                                        className="banking-content-value-desc"
                                        type="text"
                                        value={valueMsg}
                                        onChange={(e) => setvalueMsg(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* chỉnh thêm phần checked ở trên nữa là làm phần banking-footer */}
                            {/* <div className="banking-footer"></div> */}
                            <button className="banking-btn" onClick={handleNext}>
                                Tiếp tục
                            </button>
                        </div>
                    ) : !showResult ? (
                        <div className="banking-container-form-confirm">
                            <div className="banking-confirm-header">
                                <div className="banking-confirm-header-format banking-confirm-bottom">
                                    <div className="banking-confirm-header-format-title">Hình thức chuyển</div>
                                    <div className="banking-confirm-header-format-desc">
                                        Chuyển tiền ngày giá trị hiện tại
                                    </div>
                                </div>
                                <div className="banking-confirm-header-source">
                                    <div className="banking-confirm-header-source-title">Tài khoản nguồn</div>
                                    <div className="banking-confirm-header-source-desc">{user.numberCard}</div>
                                </div>
                            </div>
                            <div className="banking-confirm-content">
                                <div className="banking-confirm-content-number banking-confirm-bottom">
                                    <div className="banking-confirm-content-number-title">Tài khoản đích</div>
                                    <div className="banking-confirm-content-number-desc">{infoRecive}</div>
                                </div>
                                <div className="banking-confirm-content-name banking-confirm-bottom">
                                    <div className="banking-confirm-content-name-title">Tên người hưởng thụ</div>
                                    <div className="banking-confirm-content-name-desc">{nameRecive}</div>
                                </div>
                                <div className="banking-confirm-content-money banking-confirm-bottom">
                                    <div className="banking-confirm-content-money-title">Số tiền</div>
                                    <div className="banking-confirm-content-money-desc">{money} VND</div>
                                </div>
                                <div className="banking-confirm-content-fee banking-confirm-bottom">
                                    <div className="banking-confirm-content-fee-title">Số tiền phí</div>
                                    <div className="banking-confirm-content-fee-desc">0 VND</div>
                                </div>
                                <div className="banking-confirm-content-name-fee banking-confirm-bottom">
                                    <div className="banking-confirm-content-name-fee-title">Phí giao dịch</div>
                                    <div className="banking-confirm-content-name-fee-desc">{fee}</div>
                                </div>
                                <div className="banking-confirm-content-message">
                                    <div className="banking-confirm-content-message-title">Nội dung</div>
                                    <div className="banking-confirm-content-message-desc">{valueMsg}</div>
                                </div>
                            </div>
                            <div className="banking-confirm-footer">
                                <div className="banking-confirm-footer-content">
                                    <div className="banking-confirm-footer-content-title">
                                        Mã kiểm tra
                                        <br />
                                        <span>(Nhập mã hiển thị bên dưới)</span>
                                    </div>
                                    <input
                                        className="banking-confirm-footer-content-value"
                                        type="text"
                                        placeholder="Nhập mã kiểm tra"
                                        onChange={(e) => setCapcha(e.target.value)}
                                    />
                                </div>
                                <div className="banking-confirm-footer-capcha">
                                    <img
                                        className="banking-confirm-footer-capcha-value"
                                        src="https://vcbdigibank.vietcombank.com.vn/w1/get-captcha/93babd6c-d7c4-4f68-1338-fb9f1920bd75"
                                        alt="mã capcha"
                                    />
                                    <img
                                        className="banking-confirm-footer-capcha-reload"
                                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/primary/ic_captcha.svg"
                                        alt="reload"
                                    />
                                </div>
                            </div>
                            <div className="banking-confirm-btn">
                                <button className="banking-btn-prev" onClick={handlePrev}>
                                    Quay về
                                </button>
                                <button className="banking-btn" onClick={handleSubmit}>
                                    Đồng ý
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="banking-container-result">
                            <div className="banking-container-result-content">
                                <div className="banking-container-result-logo">
                                    <img
                                        src="https://vcbdigibank.vietcombank.com.vn/assets/images/logo-digibank-white.svg"
                                        alt="logo"
                                    />
                                </div>
                                <div className="banking-container-result-icon">
                                    <img
                                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='23.255' height='16.179'%3E%3Cpath d='M2.828 7.443l6.522 6.736L20.428 2.828' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='4'/%3E%3C/svg%3E"
                                        alt="logo"
                                    />
                                </div>
                                <div className="banking-container-result-title">GIAO DỊCH THÀNH CÔNG</div>
                                <div className="banking-container-result-money">{money} VND</div>
                                <div className="banking-container-result-time">{currentTime}</div>
                                <div className="banking-container-result-name banking-confirm-bottom">
                                    <div className="banking-container-result-name-title">Tên người thụ hưởng</div>
                                    <div className="banking-container-result-name-desc">{nameRecive}</div>
                                </div>
                                <div className="banking-container-result-number banking-confirm-bottom">
                                    <div className="banking-container-result-number-title">Tài khoản thụ hưởng</div>
                                    <div className="banking-container-result-number-desc">{infoRecive}</div>
                                </div>
                                <div className="banking-container-result-code banking-confirm-bottom">
                                    <div className="banking-container-result-code-title">Mã giao dịch</div>
                                    <div className="banking-container-result-code-desc">{curentCode}</div>
                                </div>
                                <div className="banking-container-result-message banking-confirm-bottom">
                                    <div className="banking-container-result-message-title">Nội dung</div>
                                    <div className="banking-container-result-message-desc">{valueMsg}</div>
                                </div>
                            </div>
                            <Link to="/trangchu">
                                <button className="banking-btn banking-container-result-btn">
                                    Thực hiện giao dịch mới
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                <Footer />
            </section>
        </>
    );
}

export default Banking;
