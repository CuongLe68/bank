const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');

const router = require('express').Router();

//Lấy tất cả user
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

//Xóa 1 user
router.delete('/:id',middlewareController.verifyTokenAndAdminAuth, userController.deleteUser); //concho.com/v1/auth/72384823, 72384823 là id

module.exports = router