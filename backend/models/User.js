const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true, //bắt buộc phải nhập
            minlength: 10,
            maxlength: 20,
            unique: true, //Khi người dùng gõ trùng username thì sẽ hiển thị lỗi
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        email: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 40,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            maxlength: 40,
        },
        currentmoney: {
            type: Number,
        },
        numberCard: {
            type: Number,
        },
        lastTime: {
            type: String,
        },
        admin: {
            type: Boolean, //kiểm tra user đăng nhập có phải admin không
            default: false, //mặc định là false
        },
    },
    { timestamps: true }, //thời gian tạo và update khi nào
);

module.exports = mongoose.model('User', userSchema);
