const User = require('../models/User');
const jwt = require('jsonwebtoken'); //tạo json web token
const bcrypt = require('bcrypt'); //giúp hash mật hẩu để người khác không biết được

let refreshTokens = []; //tạo nơi lưu trữ các refreshToken

const authController = {
    //ĐĂNG KÝ
    registerUser: async (req, res) => {
        try {
            //hash mật khẩu
            // const salt = await bcrypt.genSalt(10);
            // const hashed = await bcrypt.hash(req.body.password, salt)

            //tạo số thẻ
            numberCard = await Math.floor(Math.random() * 10000000000);
            if (numberCard < 1000000000) {
                numberCard = numberCard * 10;
            }

            //Tạo user mới
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                currentmoney: 0,
                numberCard: numberCard,
                // password: hashed //sử dụng khi hash password
            });
            //Lưu user vào DB
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json('Lỗi đăng ký');
        }
    },

    //Tạo accessToken
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY, //token để xác định user là ai
            { expiresIn: '3h' }, //thời gian hết hạn của token
        );
    },

    //Tạo refreshToken
    generateRefreshToken: (user) => {
        return jwt.sign(
            //sign là để tạo token
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '365d' },
        );
    },

    //ĐĂNG NHẬP
    loginUser: async (req, res) => {
        //req chính là user từ frontend gửi lên
        try {
            //kiểm tra tài khoản
            const user = await User.findOne({ username: req.body.username }); //lấy username từ frontend ra và kiếm trong database User có thằng username trùng không

            if (!user) {
                return res.status(404).json('Tên đăng nhập không chính xác!');
            }

            //kiểm tra password nhập vào có trừng với password ở database không (trong trường hợp hash)
            // const validPassword = await bcrypt.compare(
            //     req.body.password, //pass nhập vào
            //     user.password //pass ở database
            // );
            const validPassword = await (req.body.password === user.password); //so sánh pass nhập vào === pass từ databse không

            if (!validPassword) {
                return res.status(404).json('Mật khẩu không chính xác!');
            }

            //Nếu username và password đều đúng
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);

                //Lưu refreshToken vào array
                refreshTokens.push(refreshToken);

                //Lưu refreshToken vào cookie
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true, //làm cho tình duyệt phải kết nối bảo mật (secure/encrypted),
                    secure: false, //deploy thì sữa thành true, xác thực danh tính người sử dụng API đó
                    path: '/',
                    sameSite: 'strict', //để yêu cầu ghi rõ nhãn cookie của trang khác để có thể share cookie với trang này(tránh giả mạo cookie của người khác)
                });

                //set thông tin trả về khi đăng nhập thành công
                const { password, ...others } = user._doc; // trả về tất cả thông tin trừ password (._docx là toàn bộ thông tin từ id,username,....)

                res.status(200).json({ ...others, accessToken }); //nếu muốn trả về toàn bộ thì thay other thành user, ở đây là trả về tất cả + accessToken
            }
        } catch (error) {
            res.status(500).json('có lỗi đăng nhập');
        }
    },

    //refresh token
    requestRefreshToken: (req, res) => {
        //Lấy freshToken từ user
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json('Bạn chưa chứng thực tài khoản');
        }

        if (!refreshTokens.includes(refreshToken)) {
            //kiểm tra nếu token lấy từ user không tồn tại trong mảng refreshTokens
            return res.status(403).json('Refresh token is not valid');
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            //trả về 1 mảng mới không có token nào trùng với refreshToken đã lấy được ở user
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

            //Tạo refreshToken và accessToken mới
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);

            //Thêm refreshToken mới vào array
            refreshTokens.push(newRefreshToken);

            //Thêm refreshToken mới vào cookie
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            res.status(200).json({ accessToken: newAccessToken }); //trả newAccessToken mới và lưu vào accessToken
        });
    },

    //Đăng xuất user
    userLogout: async (req, res) => {
        res.clearCookie('refreshToken'); //Xóa refreshToken ra khỏi cookie
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken); //Xóa refreshToken đăng xuất ra khỏi mảng
        res.status(200).json('Logged out successfully!');
    },
};

module.exports = authController;
