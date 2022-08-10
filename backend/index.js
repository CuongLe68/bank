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

    //lắng nghe sự kiện kiểm tra thông tin giao dịch trước khi chuyển
    socket.on('client-send-check', (data) => {
        console.log(data);
        let x = false;

        userArr.map((user) => {
            if (user.numberCard === data.infoSend) {
                //kiểm tra số dư của người chuyển có lớn hơn số tiền muốn chuyển không
                if (user.currentmoney < data.money) {
                    //thông báo lỗi số dư không đủ
                    const msg = 'Lỗi: Số dư không đủ';
                    socket.emit('server-send-check-false', msg);
                } else {
                    userArr.map((user) => {
                        //kiểm tra có số thẻ người hưởng không và số thẻ người hưởng phải khác số thẻ người chuyển
                        if (user.numberCard === Number(data.infoRecive) && data.infoSend !== Number(data.infoRecive)) {
                            //Gửi thông báo chuyển tiền thành công
                            socket.emit('server-send-check-success', { ...data, nameRecive: user.name });

                            //xác nhận có số thẻ của người hưởng
                            x = true;
                        }
                    });

                    //thông báo lỗi nếu không tìm được số thẻ của người hưởng
                    if (!x) {
                        const msg = 'Lỗi: Không tìm thấy số thẻ người hưởng';
                        socket.emit('server-send-check-false', msg);
                    }
                }
            }
        });
    });

    //lắng nghe sự kiện có người chuyển tiền
    socket.on('client-send-money', (data) => {
        let time = Date();
        userArr.map((user) => {
            if (user.numberCard === Number(data.infoRecive)) {
                //cộng tiền cho người hưởng
                user.currentmoney += data.money;
                user.save();

                //trừ tiền của người gửi
                userArr.map((user) => {
                    if (user.numberCard === data.infoSend) {
                        user.currentmoney -= data.money;
                        user.save();
                    }
                });
            }
        });
        //Gửi thông báo cho người được người hưởng
        io.sockets.emit(`${data.infoRecive}`, data);

        //Gửi thông báo chuyển tiền thành công cho người gửi
        socket.emit('server-send-money-success', data);
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
