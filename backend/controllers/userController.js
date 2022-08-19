const { findById } = require('../models/User');
const User = require('../models/User');
const listMessages = require('../models/Messages');

const userController = {
    //Lấy tất cả tài khoản
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find(); //tìm và lấy tất cả các tài khoản trong User
            return res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Lấy tất cả tin nhắn
    getAllMessages: async (req, res) => {
        try {
            const listMsg = await listMessages.find();
            return res.status(200).json(listMsg);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Xóa user
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id); //tìm dựa trên id(req.params.id) thêm AndDelete nữa để xóa
            return res.status(200).json('Xóa tài khoản thành công');
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Update user
    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body.body);
            return res.status(200).json('Chỉnh sửa tài khoản thành công');
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = userController;
