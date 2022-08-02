import './Profile.css';
import { Link } from 'react-router-dom';
import Footer from '../../Modules/Config/Footer/Footer';
import Header from '../../Modules/Config/Header/Header';

const Profile = () => {
    //Xử lý tự chạy slides
    let indexOfSlides = 0;
    let IMG_WIDTH = -1016;
    let CURRENT_SLIDE = 0;
    let myInterval = setInterval(() => {
        // if (indexOfSlides < 3) {
        //     indexOfSlides++;
        //     document.querySelector('.user-header-slide-content').style.transform = `translateX(${
        //         indexOfSlides * IMG_WIDTH
        //     }px)`;
        // } else {
        //     indexOfSlides = 0;
        //     document.querySelector('.user-header-slide-content').style.transform = `translateX(${
        //         indexOfSlides * IMG_WIDTH
        //     }px)`;
        // }
        CURRENT_SLIDE = indexOfSlides;
    }, 4000);

    const handleSlidesPrev = () => {
        clearInterval(myInterval);
        if (CURRENT_SLIDE > 0) {
            CURRENT_SLIDE--;
            document.querySelector('.user-header-slide-content').style.transform = `translateX(${
                CURRENT_SLIDE * IMG_WIDTH
            }px)`;
        } else {
            CURRENT_SLIDE = 3;
            document.querySelector('.user-header-slide-content').style.transform = `translateX(${
                CURRENT_SLIDE * IMG_WIDTH
            }px)`;
        }
    };

    const handleSlidesNext = () => {
        clearInterval(myInterval);
        if (CURRENT_SLIDE < 3) {
            CURRENT_SLIDE++;
            document.querySelector('.user-header-slide-content').style.transform = `translateX(${
                CURRENT_SLIDE * IMG_WIDTH
            }px)`;
        } else {
            CURRENT_SLIDE = 0;
            document.querySelector('.user-header-slide-content').style.transform = `translateX(${
                CURRENT_SLIDE * IMG_WIDTH
            }px)`;
        }
    };

    return (
        <section className="container">
            {/* header */}
            <Header />

            {/* Header-navbar Slide*/}
            <div className="user-header">
                <div className="user-header-slide">
                    <div className="user-header-slide-left" onClick={handleSlidesPrev}>
                        <img
                            className="user-header-slide-btn"
                            src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.4' d='M35 5L15 25l20 20'/%3E%3C/svg%3E"
                            alt=""
                        />
                    </div>
                    <div className="user-header-slide-content">
                        <img
                            className="user-header-slide-img"
                            src="https://portal.vietcombank.com.vn/content/personal/KhoAnh/Anh%20CTKM/Sieu%20bao%20uu%20dai%2020%20ty/1080x280-01.jpg"
                            alt=""
                        />
                        <img
                            className="user-header-slide-img"
                            src="https://digibankm5.vietcombank.com.vn/get_file/ibomni/banner/MoTK_Top_Banner_Digibank_1080_x_280-01.jpg"
                            alt=""
                        />
                        <img
                            className="user-header-slide-img"
                            src="https://digibankm5.vietcombank.com.vn/get_file/ibomni/banner/GRAB_Top_banner_1080x280_up.jpg"
                            alt=""
                        />
                        <img
                            className="user-header-slide-img"
                            src="https://digibankm5.vietcombank.com.vn/get_file/ibomni/banner/SMARTOTP_Top_banner_1080x280_Web.jpg"
                            alt=""
                        />
                    </div>
                    <div className="user-header-slide-right" onClick={handleSlidesNext}>
                        <img
                            className="user-header-slide-btn"
                            src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.4' d='M15 5l20 20-20 20'/%3E%3C/svg%3E"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="user-content">
                {/* content 1 */}
                <div className="user-content-wrapper">
                    <Link to="/chuyentien" className="user-content-wrapper-item">
                        <div className="user-content-wrapper-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_chuyen-tien.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-desc">Chuyển tiền trong VCB</div>
                        </div>
                    </Link>
                    <div className="user-content-wrapper-item">
                        <div className="user-content-wrapper-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic-loyalty.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-desc">VCB Rewards</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-item">
                        <div className="user-content-wrapper-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_chuyen-tien-nhanh.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-desc">Chuyển tiền nhanh 247 ngoài VCB</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-item">
                        <div className="user-content-wrapper-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_chuyen-tien-ngoai.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-desc">Chuyển tiền ngoài VCB</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-item">
                        <div className="user-content-wrapper-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_cai-dat-han-muc-ct.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-desc">Cài đặt hạn mức chuyển tiền</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-item">
                        <div className="user-content-wrapper-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_mo-tiet-kiem.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-desc">Mở tiết kiệm</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-add">
                        <div className="user-content-wrapper-add-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_caidat-border.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-desc">Cài đặt chức năng nổi bật</div>
                        </div>
                    </div>

                    {/* block */}
                    <div className="user-content-wrapper-block">
                        <div className="user-content-wrapper-block-img1">
                            <p className="user-content-wrapper-block-img1-title">Chuyển tiền</p>
                        </div>
                        <div className="user-content-wrapper-block-img2">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_info-2.svg"
                                alt=""
                            />
                        </div>
                    </div>

                    {/* content 2 */}
                    <div className="user-content-wrapper-bank">
                        <div className="user-content-wrapper-bank-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_chuyen-tien.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-bank-desc">Chuyển tiền trong VCB</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-bank">
                        <div className="user-content-wrapper-bank-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_chuyen-tien-nhanh.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-bank-desc">Chuyển tiền nhanh 247 ngoài VCB</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-bank">
                        <div className="user-content-wrapper-bank-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_chuyen-tien-ngoai.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-bank-desc">Chuyển tiền ngoài VCB</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-bank">
                        <div className="user-content-wrapper-bank-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_chuyen-tien-cmt.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-bank-desc">Chuyển tiền mặt</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-bank">
                        <div className="user-content-wrapper-bank-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_chuyen-tien-tu-thien.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-bank-desc">Chuyển tiền từ thiện</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-bank">
                        <div className="user-content-wrapper-bank-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_trang-thai-lenh-chuyen-tien.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-bank-desc">Trạng thái chuyển tiền</div>
                        </div>
                    </div>
                    <div className="user-content-wrapper-bank">
                        <div className="user-content-wrapper-bank-img">
                            <img
                                src="https://vcbdigibank.vietcombank.com.vn/assets/images/web/icons/white/ic_cai-dat-han-muc-ct.svg"
                                alt=""
                            />
                            <div className="user-content-wrapper-bank-desc">Cài đặt hạn mức chuyển tiền</div>
                        </div>
                    </div>
                </div>

                {/* <div className="user-content-send"></div> */}
            </div>

            {/* Footer */}
            <Footer />
        </section>
    );
};

export default Profile;
