const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, //bắt buộc phải nhập
        minlength: 10,
        maxlength: 15,
        unique: true //Khi người dùng gõ trùng username thì sẽ hiển thị lỗi
    },
    email: {
        type: String,
        required: true,
        minlength: 13,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    admin: {
        type: Boolean, //kiểm tra user đăng nhập có phải admin không
        default: false, //mặc định là false
    },
}, {timestamps: true} //thời gian tạo và update khi nào
)

module.exports = mongoose.model("User", userSchema);