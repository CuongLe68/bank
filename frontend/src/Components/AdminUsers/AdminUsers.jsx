import { useEffect, useState } from 'react';
import { deleteUser, getAllUsers, updateUser } from '../../redux/apiRequest';
import './adminUsers.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../createInstance';
import Profile from '../Profile/Profile';
import Navbar from '../Navbar/Navbar';

const AdminUsers = () => {
    const [reset, setReset] = useState(''); //render lại trang khi xóa
    const user = useSelector((state) => state.auth.login?.currentUser); //dấu ? để khi null là nó tự hiểu null và không báo lỗi nữa
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //lấy user từ database
    const userList = useSelector((state) => state.users.users?.allUsers); //Lấy tất cả các user từ users trong file store.js

    //Lấy message để hiển thị khi xóa
    const msg = useSelector((state) => state.users?.msg);
    const [notification, setNotification] = useState(''); //thông báo

    //Lấy thông tin edit
    const [userId, setUserId] = useState('');
    const [editName, setEditName] = useState('');
    const [editEmail, setEditMail] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editNumberCard, setEditNumberCard] = useState('');
    const [editMoney, setEditMoney] = useState('');

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

    //xủ lý xóa người dùng
    const handleDelete = async (id) => {
        await deleteUser(user?.accessToken, dispatch, id, axiosJWT);
        setNotification(`(${msg})`); //hiện thông báo xáo thành công
        setReset(id); //tải lại trang
    };

    //hiện form chỉnh sửa
    const handleStartEdit = (user) => {
        setEditName(user.name);
        setEditMail(user.email);
        setEditUsername(user.username);
        setEditPassword(user.password);
        setEditNumberCard(user.numberCard);
        setEditMoney(user.currentmoney);
        setUserId(user._id);
        document.getElementsByClassName('edit')[0].style.display = 'flex';
    };

    //ẩn from chỉnh sửa
    const handleRemoveEdit = () => {
        document.getElementsByClassName('edit')[0].style.display = 'none';
    };

    //lưu giữ liệu chỉnh sửa
    const dataUpdate = {
        username: editUsername,
        email: editEmail,
        name: editName,
        password: editPassword,
        numberCard: editNumberCard,
        currentmoney: editMoney,
    };

    //xử lý chỉnh sửa thông tin người dùng
    const handleEdit = async (id) => {
        if (
            editUsername === '' &&
            editEmail === '' &&
            editName === '' &&
            editPassword === '' &&
            editNumberCard === '' &&
            editMoney === ''
        ) {
            alert('Lỗi: Không được để trống thông tin');
        } else if (editUsername.length < 10 || editUsername.length > 40) {
            alert('Lỗi: Độ tài khoản phải từ 10 - 40 ký tự');
        } else if (editName.length < 10 || editName.length > 20) {
            alert('Lỗi: Độ dài tên phải từ 10 - 20 ký tự');
        } else if (editPassword.length < 8 || editPassword.length > 40) {
            alert('Lỗi: Độ dài mật khẩu phải từ 8 - 40 ký tự');
        } else if (editNumberCard.length < 10 || editNumberCard.length > 10) {
            alert('Lỗi: Độ dài số thẻ bắt buộc 10 ký tự');
        } else if (editMoney < 0) {
            alert('Lỗi: Số dư phải lớn hơn 0 VND');
        } else {
            await updateUser(user?.accessToken, dispatch, navigate, id, axiosJWT, dataUpdate);
            setReset(dataUpdate); //tải lại trang
            handleRemoveEdit();
        }
    };

    return user?.admin ? (
        <div className="home-background">
            <Navbar />
            <div id="edit" className="edit">
                <div className="edit-box">
                    <div className="edit-box-header-box">
                        <div className="edit-box-header-box-title">Edit</div>
                        <div className="edit-box-header">
                            <span className="edit-box-header-title">Chủ thẻ</span>
                            <input
                                className="edit-box-header-input"
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </div>
                        <div className="edit-box-header">
                            <span className="edit-box-header-title">Gmail</span>
                            <input
                                className="edit-box-header-input"
                                type="email"
                                value={editEmail}
                                onChange={(e) => setEditMail(e.target.value)}
                            />
                        </div>
                        <div className="edit-box-header">
                            <span className="edit-box-header-title">Tài khoản</span>
                            <input
                                className="edit-box-header-input"
                                type="number"
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                            />
                        </div>
                        <div className="edit-box-header">
                            <span className="edit-box-header-title">Mật khẩu</span>
                            <input
                                className="edit-box-header-input"
                                type="text"
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                            />
                        </div>
                        <div className="edit-box-header">
                            <span className="edit-box-header-title">Số thẻ</span>
                            <input
                                className="edit-box-header-input"
                                type="number"
                                value={editNumberCard}
                                onChange={(e) => setEditNumberCard(e.target.value)}
                            />
                        </div>
                        <div className="edit-box-header">
                            <span className="edit-box-header-title">Số dư </span>
                            <input
                                className="edit-box-header-input"
                                type="number"
                                value={editMoney}
                                onChange={(e) => setEditMoney(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="edit-box-bottom">
                        <button className="edit-box-btn" onClick={() => handleEdit(userId)}>
                            Lưu
                        </button>
                        <button className="edit-box-btn" onClick={handleRemoveEdit}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>

            <main className="home-container">
                <div className="home-title">Danh sách người dùng</div>
                <div className="home-role">{`Giao diện của${user?.admin ? `: Quản Trị Viên` : ' bạn'}`}</div>
                <div className="errorMsg">{notification}</div>

                <div className="home-userlist">
                    <table border="1">
                        <tbody>
                            <tr>
                                <th className="home-userlist-title">Chủ thẻ</th>
                                <th className="home-userlist-title">Gmail</th>
                                <th className="home-userlist-title">Tài khoản</th>
                                <th className="home-userlist-title">Mật khẩu</th>
                                <th className="home-userlist-title">Số thẻ</th>
                                <th className="home-userlist-title">Số dư</th>
                            </tr>
                            {userList?.map((user) => {
                                //dấu ? khi null thì sẽ không list ra
                                return !user?.admin ? (
                                    <tr className="user-container">
                                        <td className="user-container-info">{user.name}</td>
                                        <td className="user-container-info">{user.email}</td>
                                        <td className="user-container-info">{user.username}</td>
                                        <td className="user-container-info">{user.password}</td>
                                        <td className="user-container-info">{user.numberCard}</td>
                                        <td className="user-container-info">{user.currentmoney} VND</td>
                                        <td className="home-btn home-btn-edit" onClick={() => handleStartEdit(user)}>
                                            CHỈNH SỬA
                                        </td>
                                        <td className="home-btn home-btn-delete" onClick={() => handleDelete(user._id)}>
                                            XÓA
                                        </td>
                                    </tr>
                                ) : (
                                    <></>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    ) : (
        <Profile />
    );
};

export default AdminUsers;
