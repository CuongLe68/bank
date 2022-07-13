const authController = require('../controllers/authController');
const middlewareController = require('../controllers/middlewareController');

//auth.js này làm nhiện vụ xử lý đăng ký đăng nhập
const router = require('express').Router();

//route đăng ký
router.post('/register', authController.registerUser);

//route đăng nhập
router.post('/login', authController.loginUser)

//Refresh
router.post('/refresh', authController.requestRefreshToken)

//Đăng xuất
router.post('/logout',middlewareController.verifyToken, authController.userLogout) //verifyToken để kiểm tra là user phải đăng nhập mới dăng xuất được

module.exports = router;