const jwt = require('jsonwebtoken')

//middleware: chặn lại để kiểm tra, nếu thỏa mãn điều kiện thì mới được đi tiếp
const middlewareController = {
    //Xác nhận token có phải của user đó không (verify token)
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token) {
            //Bearer evyvwu68332dkado
            const accessToken = token.split(' ')[1] //lấy evyvwu68332dkado
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY,(error, user) => {  // verify: chứng nhận token
                if(error) {
                    return res.status(403).json('Phiên đăng nhập đã kết thúc')
                }
                req.user = user;
                next();
            })
        }
        else {
            return res.status(401).json('Tài khoản chưa được xác thực')
        }
    },

    //Xác nhận token có phải của admin không (verify token)
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken (req, res, () => { 
            if(req.user.id == req.params.id || req.user.admin) { //nếu id là của user từ database trùng với id của user đang đăng nhập
                next();
            }
            else {
                return res.status(403).json('Bạn không có quyền xóa tài khoản này!')
            }
        })
    }
}

module.exports = middlewareController;