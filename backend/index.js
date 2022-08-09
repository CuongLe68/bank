const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); //tải các biến môi trường từ tệp .env vào process.env. Lưu trữ cấu hình trong .env tách biệt với code để bảo mật thông tin.
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//import các routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('CONNECT TO MONGO DB SECCESSFULY!!');
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES (get,put,patch,delete,...)
app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);

//socket.io {
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', //kết nối tới web mà mình sẽ chạy, chỉ cho phép soket kết nối vs url này
        methods: ['GET', 'POST'], //phương thức trao đổi dữ liệu
    },
});

//lấy giữ liệu từ mongoDB 9/8/2022
const User = require('./models/User');

const userArr = [];
const users = User.find({}).exec(); //Lấy tất cả user từ DB

users.then(function (result) {
    result.map((user) => {
        userArr.push(user); //lấy tất cả user lưu vào mảng
    });
});

io.on('connection', (socket) => {
    console.log(socket.id + ' đã kết nối');

    socket.on('client-send-money', (data) => {
        console.log(data);
        let x = false;

        userArr.map((user) => {
            if (user.numberCard === data.infoSend) {
                if (user.currentmoney < data.money) {
                    const msg = 'Lỗi: Số dư không đủ';
                    console.log('số dư không đủ');
                    socket.emit('server-send-money-false', msg);
                } else {
                    userArr.map((user) => {
                        if (user.numberCard === Number(data.infoRecive) && data.infoSend !== Number(data.infoRecive)) {
                            //cộng tiền cho người nhận
                            user.currentmoney += data.money;
                            user.save();

                            //trừ tiền của người gửi
                            userArr.map((user) => {
                                if (user.numberCard === data.infoSend) {
                                    user.currentmoney -= data.money;
                                    user.save();
                                }
                            });

                            //Gửi thông báo cho người được nhận tiền
                            io.sockets.emit(`${data.infoRecive}`, data);

                            //Gửi thông báo chuyển tiền thành công
                            const msg = 'Chuyển tiền thành công!';
                            socket.emit('server-send-money-success', msg);

                            x = true;
                        }
                    });

                    if (!x) {
                        const msg = 'Lỗi: Không tìm thấy số thẻ người hưởng';
                        socket.emit('server-send-money-false', msg);
                    }
                }
            }
        });
    });

    socket.on('disconnect', () => {
        console.log(socket.id + ' đã thoát');
    });
});

server.listen('5000', (req, res) => {
    console.log(`SERVER SOCKET.IO RUNNING! http://localhost:5000`);
});
//socket.io }

//api connect
app.listen(8000, () => {
    console.log(`server is running: http://localhost:8000`);
});

//AUTHENTICATION (xử lý chức năng đăng ký đăng nhập)
//AUTHORIZATION (Phân quyền <admin và user>)
