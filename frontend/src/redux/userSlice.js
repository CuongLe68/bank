//Chứa tất cả các user render ra từ database
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null, //Chứa tất cả user
            isFetching: false,
            error: false,
        },
        msg: '',
    },
    reducers: {
        //Lấy tất cả người dùng
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersFalse: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //Xóa 1 người dùng
        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            //Khi muốn trả cái gì đó về phí client thì dùng action
            state.users.isFetching = false;
            state.msg = action.payload; //trả dòng chữ về
        },
        deleteUserFalse: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //Chỉnh sửa thông tin của 1 người dùng
        updateUserStart: (state) => {
            state.users.isFetching = true;
        },
        updateUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.error = false;
        },
        updateUserFalse: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFalse,

    deleteUserStart,
    deleteUserSuccess,
    deleteUserFalse,

    updateUserStart,
    updateUserSuccess,
    updateUserFalse,
} = userSlice.actions;

export default userSlice.reducer;
