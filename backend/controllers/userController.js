const { findById } = require('../models/User');
const User = require('../models/User')

const userController = {
    //Lấy tất cả tài khoản
    getAllUsers: async(req, res)  => {
        try {
            const user = await User.find(); //tìm và lấy tất cả các tài khoản trong User
            return res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //Xóa user
    deleteUser: async(req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id) //tìm dựa trên id(req.params.id) thêm anđelete nữa để xóa
            return res.status(200).json('Xóa tài khoản thành công')
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = userController