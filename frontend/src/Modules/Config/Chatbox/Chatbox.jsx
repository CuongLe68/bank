import './Chatbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

//gọi lại database
import { getListMessages } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/authSlice';

function Chatbox() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const socket = io.connect('http://localhost:5000');
    const [showChat, setShowChat] = useState(true);
    const [messages, setMessages] = useState('');
    const [reset, setReset] = useState(true);

    const handleShow = () => {
        setShowChat(!showChat);
        if (showChat) {
            document.getElementsByClassName('chatbox-container')[0].style.display = 'flex';
        } else {
            document.getElementsByClassName('chatbox-container')[0].style.display = 'none';
        }
    };

    //logic nhắn tin
    const msgList = useSelector((state) => state.users.users?.allMessages); //lấy tất cả tin nhắn

    const hanldleSend = () => {
        if (messages === '') {
            alert('Lỗi: Vui lòng nhập tin nhắn');
        } else {
            socket.emit('client-send-messages', {
                messages: messages,
                numberCard: user.numberCard,
            });
            setMessages('');
        }
        setReset(!reset);
    };

    useEffect(() => {
        socket.on(`server-admin-send-messages-to-${user.numberCard}`, (data) => {
            setReset(!reset);
        });
        getListMessages(user?.accessToken, dispatch, axiosJWT);
        // eslint-disable-next-line
    }, [reset]);

    return (
        <div className="chatbox-wrapper">
            <div className="chatbox-container-box" onClick={() => handleShow()}>
                <FontAwesomeIcon className="chatbox-container-box-icon" icon={faCommentDots} />
            </div>
            <div className="chatbox-container">
                <div className="messages-container-content-messages">
                    <div className="messages-container-content-messages-header">
                        <div className="messages-container-content-messages-header-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-messages-header-name">Admin</div>
                    </div>

                    <div className="messages-container-content-messages-content">
                        {msgList.map((msg) => {
                            return user.numberCard === msg.numberCard ? (
                                msg.admin ? (
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
                            value={messages}
                            onChange={(e) => setMessages(e.target.value)}
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
            </div>
        </div>
    );
}

export default Chatbox;
