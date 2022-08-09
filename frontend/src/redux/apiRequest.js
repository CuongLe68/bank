//xử lý tất cả các api lấy được và truyền cho redux
import axios from 'axios';
import {
    loginFalse,
    loginStart,
    loginSuccess,
    logOutFalse,
    logOutStart,
    logOutSuccess,
    registerFalse,
    registerStart,
    registerSuccess,
} from './authSlice';
import {
    deleteUserFalse,
    deleteUserStart,
    deleteUserSuccess,
    getUsersFalse,
    getUsersStart,
    getUsersSuccess,
} from './userSlice';

//Xử lý đăng ký
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('/v1/auth/register', user); //Gửi lên sever
        dispatch(registerSuccess());
        navigate('/');
    } catch (error) {
        dispatch(registerFalse());
    }
};

//Xử lý đăng nhập
export const loginUser = async (user, dispatch, navigate) => {
    //post request tới API, user(name,pass), dispatch: gọi các action từ authSlice, navigate chuyển đến trang mới
    dispatch(loginStart()); //Hiện bắt đầu đăng nhập
    try {
        const res = await axios.post('/v1/auth/login', user); //gọi tới thằng backend (ở đây chính là: localhost:8000/v1/auth/login để thực hiện dăng nhập, localhost:8000 được set ở packet.json phần proxy)
        dispatch(loginSuccess(res.data)); //đăng nhập thành công, trả thông tin của user từ database về trình duyệt
        navigate('/trangchu'); //điều hướng tới trang chủ
    } catch (error) {
        dispatch(loginFalse());
    }
};

//Đăng xuất
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post('v1/auth/logout', id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logOutSuccess());
        navigate('/');
        window.location.reload(); //xử lý tạm thời để tránh lỗi style null ở profile.jsx và refresh lại capcha mới
    } catch (error) {
        dispatch(logOutFalse());
    }
};

//Xử lý Lấy tất cả user
export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    //axiosJWT giúp đảm bảo token luôn còn hạn khi xóa
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get('/v1/user', {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFalse());
    }
};

//Xử lý xóa người dùng
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete('/v1/user/' + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (error) {
        dispatch(deleteUserFalse(error.response.data)); //Lấy từ res.status(...(vd như 403)).json('lỗi gì đo')
    }
};
