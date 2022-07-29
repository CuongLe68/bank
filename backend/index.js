const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
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

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running: http://localhost:8000`);
});

//AUTHENTICATION (xử lý chức năng đăng ký đăng nhập)
//AUTHORIZATION (Phân quyền <admin và user>)
