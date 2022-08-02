import './Footer.css';

function Footer() {
    return (
        <footer>
            <a className="user-content-footer-link" href="/" alt="">
                Trang chủ
            </a>
            <div className="user-content-footer">|</div>
            <a
                className="user-content-footer-link"
                href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/dieu-khoan-dk-kh-ca-nhan.html"
                alt=""
            >
                Điều khoản sử dụng dịch vụ
            </a>
            <div className="user-content-footer">|</div>
            <a
                className="user-content-footer-link"
                href="https://portal.vietcombank.com.vn/Personal/BP/Pages/chi-tiet-bieu-phi.aspx?ItemID=68&devicechannel=default"
                alt=""
            >
                Biểu phí dịch vụ
            </a>
            <div className="user-content-footer">|</div>
            <a
                className="user-content-footer-link"
                href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/hdsd-ib/pages/vi/menu.html"
                alt=""
            >
                Hướng dẫn sử dụng dịch vụ
            </a>
            <div className="user-content-footer">|</div>
            <a
                className="user-content-footer-link"
                href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/huong-dan-giao-dich-an-toan.html"
                alt=""
            >
                Hướng dẫn giao dịch an toàn
            </a>
        </footer>
    );
}

export default Footer;
