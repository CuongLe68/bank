//xử lý tất cả các api lấy được và truyền cho redux
import axios from 'axios';
import { loginFalse, loginStart, loginSuccess, logOutFalse, logOutStart, logOutSuccess, registerFalse, registerStart, registerSuccess } from './authSlice';
import { deleteUserFalse, deleteUserStart, deleteUserSuccess, getUsersFalse, getUsersStart, getUsersSuccess } from './userSlice';

//Xử lý đăng nhập
export const loginUser = async(user, dispatch, navigate) => { //post request tới API, user(name,pass), dispatch: gọi các action từ authSlice, navigate chuyển đến trang mới 
    dispatch(loginStart()); //Hiện bắt đầu đăng nhập
    try {
        const res = await axios.post('/v1/auth/login', user);
        dispatch(loginSuccess(res.data)); //đăng nhập thành công, trả thông tin cho người dùng
        navigate('/') //điều hướng
    } catch (error) {
        dispatch(loginFalse());
    }
}


//Xử lý đăng ký
export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('/v1/auth/register', user); //Gửi lên sever
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(registerFalse());
    }
}

//Xử lý Lấy tất cả user
export const getAllUsers = async(accessToken, dispatch, axiosJWT) => { //axiosJWT giúp đảm bảo token luôn còn hạn khi xóa
    dispatch(getUsersStart())
    try {
        const res = await axiosJWT.get('/v1/user',{ 
            headers: {token: `Bearer ${accessToken}`},
        })
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFalse())
    }
}

//Xử lý xóa người dùng
export const deleteUser = async(accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart())
    try {
        const res = await axiosJWT.delete('/v1/user/' + id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteUserSuccess(res.data))
    } catch (error) {
        dispatch(deleteUserFalse(error.response.data)); //Lấy từ res.status(...(vd như 403)).json('lỗi gì đo')
    }
}

//Đăng xuất
export const logOut = async(dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post('v1/auth/logout',id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(logOutSuccess())
        navigate('/login')
    } catch (error) {
        dispatch(logOutFalse())
    }
}