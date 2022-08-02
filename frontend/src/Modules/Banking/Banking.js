import { Link } from 'react-router-dom';
import Footer from '../Config/Footer/Footer';
import Header from '../Config/Header/Header';
import './Banking.css';

function Banking() {
    return (
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

                {/* Đến đây 3/8/2022 */}
                <div className="banking-add"></div>
                <div className="banking-content"></div>
                <div className="banking-footer"></div>
                {/* <button className="banking-btn">Xác nhận</button> */}
            </div>

            <Footer />
        </section>
    );
}

export default Banking;
