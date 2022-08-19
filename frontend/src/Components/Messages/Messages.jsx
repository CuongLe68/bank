import './messages.css';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

//gọi lại database
import { getListMessages } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';

function Messages() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const userList = useSelector((state) => state.users.users?.allUsers); //lấy tất cả user

    const [getName, setGetName] = useState('');
    const [getNumberCard, setGetNumberCard] = useState('');
    const [getEmail, setGetEmail] = useState('');
    const [getUserName, setGetUserName] = useState('');
    const [getPassword, setGetPassword] = useState('');
    const [getMoney, setGetMoney] = useState('');
    const [getDateResgister, setGetDateResgister] = useState('');
    const [getLastTime, setGetLastTime] = useState('');

    const [valueSearch, setValueSearch] = useState(''); //lấy giá trị tìm kiếm

    const socket = io.connect('http://localhost:5000');
    const [messages, setMessages] = useState(''); //Gửi tin nhắn
    const [contactUser, setContactUser] = useState(''); //chọn người nhắn tin
    const [reset, setReset] = useState(true);

    //logic để tìm kiếm
    let usersSearch = userList.filter((user) => {
        return user.name.includes(valueSearch.trim().toUpperCase());
    });

    //logic clear tìm kiếm
    const handleClearSearch = () => {
        setValueSearch('');
    };

    //logic lấy thông tin user
    const handleShow = (user) => {
        setContactUser(user.numberCard);
        let date = user.createdAt.slice(0, 7);
        let day = user.createdAt.slice(8, 10);
        let hours = Number(user.createdAt.slice(11, 13)) - 5;
        if (hours < 0) {
            hours = hours + 24;
            day = day - 1;
        }
        let time = user.createdAt.slice(14, 19);

        let dateCreate = `${date}-${day} ${hours}:${time}`;

        setGetName(user.name);
        setGetNumberCard(user.numberCard);
        setGetEmail(user.email);
        setGetUserName(user.username);
        setGetPassword(user.password);
        setGetMoney(user.currentmoney);
        setGetDateResgister(dateCreate);
        setGetLastTime(user.lastTime);
    };

    //logic nhắn tin
    const msgList = useSelector((state) => state.users.users?.allMessages); //lấy tất cả tin nhắn

    const hanldleSend = () => {
        if (contactUser === '') {
            alert('Lỗi: bạn chưa chọn người dùng');
        } else if (messages === '') {
            alert('Lỗi: Vui lòng nhập tin nhắn');
        }
        if (messages !== '' && contactUser !== '') {
            socket.emit('admin-send-messages', {
                messages: messages,
                numberCard: contactUser,
            });
            setMessages('');
        }
        setReset(!reset);
    };

    useEffect(() => {
        socket.on('server-send-messages', (data) => {
            setReset(!reset);
        });
        getListMessages(user?.accessToken, dispatch, axiosJWT);
        // eslint-disable-next-line
    }, [reset]);

    return (
        <div className="messages-container">
            {/* navbar */}
            <Navbar />
            <div className="messages-container-header">
                <div className="messages-container-header-logo">Quản lí tin nhắn</div>
            </div>
            <div className="messages-container-content">
                <div className="messages-container-content-list">
                    <div className="messages-container-content-list-search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng"
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e.target.value)}
                        />
                        {valueSearch === '' ? (
                            <FontAwesomeIcon
                                className="messages-container-content-list-search-icon"
                                icon={faMagnifyingGlass}
                            />
                        ) : (
                            <FontAwesomeIcon
                                className="messages-container-content-list-search-icon"
                                icon={faXmark}
                                onClick={handleClearSearch}
                            />
                        )}
                    </div>
                    {usersSearch.map((user) => {
                        return !user?.admin ? (
                            <div className="messages-container-content-list-item" onClick={() => handleShow(user)}>
                                <div className="messages-container-content-list-item-logo">
                                    <img
                                        src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                        alt="logo"
                                    />
                                </div>
                                <div className="messages-container-content-list-item-name">{user.name}</div>
                            </div>
                        ) : (
                            <></>
                        );
                    })}
                </div>
                <div className="messages-container-content-messages">
                    <div className="messages-container-content-messages-header">
                        <div className="messages-container-content-messages-header-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-messages-header-name">{getName}</div>
                    </div>

                    <div className="messages-container-content-messages-content">
                        {msgList.map((msg) => {
                            return contactUser === msg.numberCard ? (
                                !msg.admin ? (
                                    <div key={msg._id} className="messages-container-content-messages-content-client">
                                        <div className="messages-container-content-messages-content-client-logo">
                                            <img
                                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                                alt="logo"
                                            />
                                        </div>
                                        <div className="messages-container-content-messages-content-client-msg">
                                            <p className="messages-container-content-messages-content-client-msg-text">
                                                {msg.messages}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="messages-container-content-messages-content-admin">
                                        <div className="messages-container-content-messages-content-admin-msg">
                                            <p style={{ flex: 1 }}></p>
                                            <p className="messages-container-content-messages-content-admin-msg-text">
                                                {msg.messages}
                                            </p>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <></>
                            );
                        })}
                    </div>

                    <div className="messages-container-content-messages-footer">
                        <input
                            type="text"
                            placeholder="messages..."
                            onChange={(e) => setMessages(e.target.value)}
                            value={messages}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    hanldleSend();
                                }
                            }}
                        />
                        <button className="messages-container-content-messages-footer-btn" onClick={hanldleSend}>
                            Gửi
                        </button>
                    </div>
                </div>

                <div className="messages-container-content-info">
                    <div className="messages-container-content-info-logo">
                        <img
                            src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                            alt="logo"
                        />
                        <div className="messages-container-content-info-name">{getName}</div>
                    </div>
                    <div className="messages-container-content-info-content">
                        <div className="messages-container-content-info-content-title">Thông tin của tài khoản</div>
                        <div className="messages-container-content-info-content-item">
                            <div className="messages-container-content-info-content-item-tittle">Số thẻ</div>
                            <div className="messages-container-content-info-content-item-desc">{getNumberCard}</div>
                        </div>
                        <div className="messages-container-content-info-content-item">
                            <div className="messages-container-content-info-content-item-tittle">Email</div>
                            <div className="messages-container-content-info-content-item-desc">{getEmail}</div>
                        </div>
                        <div className="messages-container-content-info-content-item">
                            <div className="messages-container-content-info-content-item-tittle">Tài khoản</div>
                            <div className="messages-container-content-info-content-item-desc">{getUserName}</div>
                        </div>
                        <div className="messages-container-content-info-content-item">
                            <div className="messages-container-content-info-content-item-tittle">Mật khẩu</div>
                            <div className="messages-container-content-info-content-item-desc">{getPassword}</div>
                        </div>
                        <div className="messages-container-content-info-content-item">
                            <div className="messages-container-content-info-content-item-tittle">Số dư</div>
                            <div className="messages-container-content-info-content-item-desc">{getMoney} VND</div>
                        </div>
                        <div className="messages-container-content-info-content-item">
                            <div className="messages-container-content-info-content-item-tittle">Ngày tạo</div>
                            <div className="messages-container-content-info-content-item-desc">{getDateResgister}</div>
                        </div>
                        <div className="messages-container-content-info-content-item">
                            <div className="messages-container-content-info-content-item-tittle" style={{ width: 180 }}>
                                Đăng nhập gần nhất
                            </div>
                            <div className="messages-container-content-info-content-item-desc">{getLastTime}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
