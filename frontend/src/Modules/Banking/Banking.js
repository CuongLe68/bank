import { Link } from 'react-router-dom';
import Footer from '../Config/Footer/Footer';
import Header from '../Config/Header/Header';
import './Banking.css';

function Banking() {
    // eslint-disable-next-line
    const deleteErr = () => {
        alert('Đóng');
        document.getElementById('err').classList.remove('err'); //không remove class được dkm cay vl
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
                            <select className="banking-header-number-section">
                                <option>0123456789 - VND</option>
                                <option>0909900009 - VND</option>
                            </select>
                        </div>
                        <div className="banking-header-money">
                            <div className="banking-header-money-title">Số dư khả dụng</div>
                            <div className="banking-header-money-curent">1,504,320 VND</div>
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
                            />
                            <img
                                className="banking-info-number-img"
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/dark/ic_contact.svg"
                                alt="danhba"
                            />
                        </div>
                    </div>

                    {/* content */}
                    <div className="banking-content"></div>
                    <div className="banking-footer"></div>
                    {/* <button className="banking-btn">Xác nhận</button> */}
                </div>

                <Footer />
            </section>
        </>
    );
}

export default Banking;
