const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');

const router = require('express').Router();

//Lấy tất cả user
router.get('/', middlewareController.verifyToken, userController.getAllUsers);

//Lấy tất cả tin nhắn
router.get('/messages/', middlewareController.verifyToken, userController.getAllMessages);

//Xóa 1 user
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, userController.deleteUser); //concho.com/v1/auth/72384823, 72384823 là :id

//Chỉnh sữa 1 user
router.put('/:id', userController.updateUser); //chỉnh sửa các thông tin của user
// router.put('/:id', middlewareController.verifyTokenAndAdminAuth, userController.updateUser); //chỉnh sửa các thông tin của user

module.exports = router;
