import './adminHome.css';
import Profile from '../Profile/Profile';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';

const AdminHome = () => {
    const user = useSelector((state) => state.auth.login?.currentUser); //dấu ? để khi null là nó tự hiểu null và không báo lỗi nữa

    return user?.admin ? (
        <div className="adminhome-container">
            <Navbar />
            Trang chủ
        </div>
    ) : (
        <Profile />
    );
};

export default AdminHome;
