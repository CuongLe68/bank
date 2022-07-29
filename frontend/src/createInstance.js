import axios from 'axios';
import jwt_decode from 'jwt-decode';

const refreshToken = async () => {
    try {
        const res = await axios.post('/v1/auth/refresh', {
            withCredentials: true, //có cookie thì gắn vào
        });
        return res.data; //trả lại refreshToken và accessToken mới cho user
    } catch (error) {}
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        //interceptors: kiểm tra trong dấu ngoặc trước khi gọi Api sử dụng thư viện jwt-decode
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken); //giải mã token, trả về thông tin của token (nhue giả mả trên web jwt.io)
            if (decodedToken.exp < date.getTime() / 1000) {
                //decodedToken.exp là thời gian CỦA token, date.getTime() là thời gian hiện tại
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser)); //Lấy thông tin mới của user (mặc định nó sẽ lấy action.payload)
                config.headers['token'] = 'Bearer' + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject; //reject là thấy bại
        },
    );
    return newInstance;
};
