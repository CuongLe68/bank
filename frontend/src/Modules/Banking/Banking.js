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
    const [infoSend, setInfoSend] = useState(user.numberCard); // thông tin người gửi
    const [infoRecive, setInfoRecive] = useState(null); //thông tin người nhận
    const [money, setMoney] = useState(null); //số tiền muốn chuyển
    const [fee, setFee] = useState('Người chuyển trả'); //phí chuyển
    const [valueMsg, setvalueMsg] = useState(`${user.name} chuyen khoan`); //Nội dung

    // eslint-disable-next-line
    const deleteErr = () => {
        alert('Đóng');
        document.getElementById('err').classList.remove('err'); //không remove class được dkm cay vl :((
    };

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
                <button class="err-box-btn" onClick={deleteErr}>
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

    // eslint-disable-next-line
    const formSubmit = {
        name: user.name,
        infoSend: infoSend,
        infoRecive: infoRecive,
        money: Number(money),
        fee: fee,
        message: valueMsg,
    };

    useEffect(() => {
        socket.on('server-send-money-success', (msg) => {
            alert(msg);
        });
        socket.on('server-send-money-false', (msg) => {
            alert(msg);
        });
    }, []);

    const handleSubmit = () => {
        if (infoRecive === null) {
            alert('Lỗi: vui lòng nhập thông tin người hưởng!');
        } else {
            if (money === null || money <= 0) {
                alert('Lỗi: Vui lòng nhập số tiền muốn gửi!');
            }
        }
        if (infoRecive !== null && money !== null) {
            socket.emit('client-send-money', formSubmit);
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
                            <div className="banking-confirm-item-index active">1</div>
                            <div className="banking-confirm-item-desc">Khởi tạo</div>
                        </div>
                        <div className="banking-confirm-item">
                            <div className="banking-confirm-item-index" style={{ margin: 'auto' }}>
                                2
                            </div>
                            <div className="banking-confirm-item-desc">Xác nhận</div>
                        </div>
                        <div className="banking-confirm-item">
                            <div className="banking-confirm-item-index" style={{ marginLeft: 30 }}>
                                3
                            </div>
                            <div className="banking-confirm-item-desc" style={{ textAlign: 'end' }}>
                                Kết quả
                            </div>
                        </div>
                    </div>

                    <div className="banking-desc">Mô tả và một số lưu ý đối với tính năng chuyển tiền </div>

                    <div className="banking-header">
                        <div className="banking-header-number">
                            <div className="banking-header-number-title">Tài khoản nguồn</div>
                            <select
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
                    <button className="banking-btn" onClick={handleSubmit}>
                        Tiếp tục
                    </button>
                </div>

                <Footer />
            </section>
        </>
    );
}

export default Banking;
