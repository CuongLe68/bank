//Đảm nhận việc login logout
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null, //login thành công thì sẽ bỏ toàn bộ thông tin trả về vào biến này
            isFetching: false, //loading
            error: false, //kiểm tra có lỗi không
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        //Đăng nhập
        loginStart: (state) => {
            //khi bắt đầu login
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            //login thành công
            state.login.isFetching = false;
            state.login.currentUser = action.payload; //trả lại thông tin cho người dùng
            state.login.error = false;
        },
        loginFalse: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
            alert('Tài khoản hoặc mật khẩu không đúng');
        },

        //Đăng ký
        registerStart: (state) => {
            //khi bắt đầu đăng ký
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            //đăng ký thành công
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
            alert('Đăng ký tài khoản thành công');
        },
        registerFalse: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
            alert('Số điện thoại đã được dăng ký');
        },

        //Logout
        logOutStart: (state) => {
            state.login.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.error = false;
            state.login.currentUser = null;
        },
        logOutFalse: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFalse,

    registerStart,
    registerSuccess,
    registerFalse,

    logOutStart,
    logOutSuccess,
    logOutFalse,
} = authSlice.actions; //gửi dữ liệu từ data app đến file redux/store.js

export default authSlice.reducer; //export các state hiện tại của app,thực hiện một action và trả về một state mới.
