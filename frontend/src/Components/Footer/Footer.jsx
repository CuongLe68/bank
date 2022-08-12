import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faHeadphones } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div className="home-footer">
            <div className="footer-left">
                <div>
                    <a
                        className="footer-left-item"
                        href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/dieu-khoan-dk-kh-ca-nhan.html"
                    >
                        Điều khoản sử dụng dịch vụ
                    </a>
                </div>
                <div className="col-auto"> | </div>
                <div>
                    <a
                        className="footer-left-item"
                        href="https://portal.vietcombank.com.vn/Personal/BP/Pages/chi-tiet-bieu-phi.aspx?ItemID=68&devicechannel=default"
                    >
                        Biểu phí dịch vụ
                    </a>
                </div>
                <div className="col-auto"> | </div>
                <div>
                    <a
                        className="footer-left-item"
                        href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/hdsd-ib/pages/vi/menu.html"
                    >
                        Hướng dẫn sử dụng dịch vụ
                    </a>
                </div>
                <div className="col-auto"> | </div>
                <div>
                    <a
                        className="footer-left-item"
                        href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/huong-dan-giao-dich-an-toan.html"
                    >
                        Hướng dẫn giao dịch an toàn
                    </a>
                </div>
                <div className="col-auto"> | </div>
                <div>
                    <a
                        className="footer-left-item"
                        href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/faq/index.html"
                    >
                        Câu hỏi thường gặp
                    </a>
                </div>
            </div>
            <div className="footer-right">
                <div className="footer-right-item">
                    <a
                        className="right-other"
                        href="https://portal.vietcombank.com.vn/Personal/Pages/branch-support-number.aspx?devicechannel=default"
                    >
                        <FontAwesomeIcon className="footer-right-icon" icon={faHeadphones} />
                        Liên hệ
                    </a>
                </div>
                <div className="footer-right-item">
                    <a className="right-other" href="/">
                        <FontAwesomeIcon className="footer-right-icon" icon={faGlobe} />
                        English
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
