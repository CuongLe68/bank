import { useEffect, useState } from 'react';
import { deleteUser, getAllUsers } from '../../redux/apiRequest';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';
import Profile from '../Profile/Profile';
import NavBar from '../NavBar/NavBar';

const HomePage = () => {
    const [reset, setReset] = useState(''); //render lại trang khi xóa
    const user = useSelector((state) => state.auth.login?.currentUser); //dấu ? để khi null là nó tự hiểu null và không báo lỗi nữa
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //lấy user từ database
    const userList = useSelector((state) => state.users.users?.allUsers); //Lấy tất cả các user từ users trong file store.js

    //Lấy message để hiển thị khi xóa
    const msg = useSelector((state) => state.users?.msg);
    const [notification, setNotification] = useState('');

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        if (!user) {
            //Nếu chưa đăng nhập thì sẽ tự động chuyển đến trang đăng nhập
            navigate('/');
        }
        if (user?.accessToken) {
            //Phải có accessToken khi đăng nhập mới lấy tất cả user được
            getAllUsers(user?.accessToken, dispatch, axiosJWT);
        }
        // eslint-disable-next-line
    }, [reset]);

    const handleDelete = async (id) => {
        await deleteUser(user?.accessToken, dispatch, id, axiosJWT);
        setNotification(msg);
        setReset(id);
    };

    return user?.admin ? (
        <>
            <NavBar />
            <main className="home-container">
                <div className="home-title">Danh sách người dùng</div>
                <div className="home-role">{`Giao diện của${user?.admin ? `: Quản Trị Viên` : ' bạn'}`}</div>
                <div className="home-userlist">
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>Chủ thẻ</th>
                                <th>Gmail</th>
                                <th>Tài khoản</th>
                                <th>Mật khẩu</th>
                                <th>Số thẻ</th>
                                <th>Số dư</th>
                            </tr>
                            {userList?.map((user) => {
                                //dấu ? khi null thì sẽ không list ra
                                return !user?.admin ? (
                                    <tr key={user._id} className="user-container">
                                        <td className="info">{user.name}</td>
                                        <td className="info">{user.email}</td>
                                        <td className="info">{user.username}</td>
                                        <td className="info">{user.password}</td>
                                        <td className="info">{user.numberCard}</td>
                                        <td className="info">{user.currentmoney} VND</td>
                                        <td className="delete-user" onClick={() => handleDelete(user._id)}>
                                            DELETE
                                        </td>
                                    </tr>
                                ) : (
                                    <></>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="errorMsg">{notification}</div>
            </main>
        </>
    ) : (
        <Profile />
    );
};

export default HomePage;
