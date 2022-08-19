const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        admin: {
            type: Boolean, //kiểm tra user đăng nhập có phải admin không
            default: false, //mặc định là false
        },
        numberCard: {
            type: Number,
        },
        messages: {
            type: String,
            minlength: 1,
            maxlength: 1000,
        },
    },
    { timestamps: true }, //thời gian tạo và update khi nào
);

module.exports = mongoose.model('listMessages', messagesSchema);
