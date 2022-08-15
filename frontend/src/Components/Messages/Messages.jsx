import './messages.css';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Messages() {
    return (
        <div className="messages-container">
            <Navbar />
            <div className="messages-container-header">
                <div className="messages-container-header-logo">Quản lí tin nhắn</div>
            </div>
            <div className="messages-container-content">
                <div className="messages-container-content-list">
                    <div className="messages-container-content-list-search">
                        <input type="text" placeholder="Tìm kiếm người dùng" />
                        <FontAwesomeIcon
                            className="messages-container-content-list-search-icon"
                            icon={faMagnifyingGlass}
                        />
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">LE QUOC CUONG</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">PHAM THI CHUOT</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">LUU BA ON</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">AU DUONG PHONG</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">DONG PHUONG BAT BAI</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">PHAM THI CHUOT</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">LUU BA ON</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">AU DUONG PHONG</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">DONG PHUONG BAT BAI</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">PHAM THI CHUOT</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">LUU BA ON</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">AU DUONG PHONG</div>
                    </div>
                    <div className="messages-container-content-list-item">
                        <div className="messages-container-content-list-item-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-list-item-name">DONG PHUONG BAT BAI</div>
                    </div>
                </div>
                <div className="messages-container-content-messages">
                    <div className="messages-container-content-messages-header">
                        <div className="messages-container-content-messages-header-logo">
                            <img
                                src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                alt="logo"
                            />
                        </div>
                        <div className="messages-container-content-messages-header-name">LE QUOC CUONG</div>
                    </div>

                    <div className="messages-container-content-messages-content">
                        <div className="messages-container-content-messages-content-client">
                            <div className="messages-container-content-messages-content-client-logo">
                                <img
                                    src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                    alt="logo"
                                />
                            </div>
                            <div className="messages-container-content-messages-content-client-msg">
                                <p className="messages-container-content-messages-content-client-msg-text">alo</p>
                                <p className="messages-container-content-messages-content-client-msg-text">
                                    có onl ở đó k cu, tư vấn cho t mấy cái này với cu
                                </p>
                            </div>
                        </div>
                        <div className="messages-container-content-messages-content-admin">
                            <div className="messages-container-content-messages-content-admin-msg">
                                <p style={{ flex: 1 }}></p>
                                <p className="messages-container-content-messages-content-admin-msg-text">gi rứa cu</p>
                            </div>
                        </div>

                        {/* client 2 */}
                        <div className="messages-container-content-messages-content-client">
                            <div className="messages-container-content-messages-content-client-logo">
                                <img
                                    src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                    alt="logo"
                                />
                            </div>
                            <div className="messages-container-content-messages-content-client-msg">
                                <p className="messages-container-content-messages-content-client-msg-text">đây ku</p>
                                <p className="messages-container-content-messages-content-client-msg-text">
                                    Tư vấn thêm về các dịch vụ và chức năng của phần mềm này cho t hiểu đi man
                                </p>
                            </div>
                        </div>

                        {/* admin 2 */}
                        <div className="messages-container-content-messages-content-admin">
                            <div className="messages-container-content-messages-content-admin-msg">
                                <p style={{ flex: 1 }}></p>
                                <p className="messages-container-content-messages-content-admin-msg-text">gi rứa cu</p>
                            </div>
                            <div className="messages-container-content-messages-content-admin-msg">
                                <p style={{ flex: 1 }}></p>
                                <p className="messages-container-content-messages-content-admin-msg-text">
                                    gi rứa cu Tư vấn thêm về các dịch vụ và chức năng của phần nào: vd thử đi abcxyz...
                                </p>
                            </div>
                        </div>

                        {/* client 3 */}
                        <div className="messages-container-content-messages-content-client">
                            <div className="messages-container-content-messages-content-client-logo">
                                <img
                                    src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                    alt="logo"
                                />
                            </div>
                            <div className="messages-container-content-messages-content-client-msg">
                                <p className="messages-container-content-messages-content-client-msg-text">đây ku</p>
                                <p className="messages-container-content-messages-content-client-msg-text">
                                    Tư vấn thêm về các dịch vụ và chức năng của phần mềm này cho t hiểu đi man
                                </p>
                            </div>
                        </div>

                        {/* admin 3 */}
                        <div className="messages-container-content-messages-content-admin">
                            <div className="messages-container-content-messages-content-admin-msg">
                                <p style={{ flex: 1 }}></p>
                                <p className="messages-container-content-messages-content-admin-msg-text">gi rứa cu</p>
                            </div>
                            <div className="messages-container-content-messages-content-admin-msg">
                                <p style={{ flex: 1 }}></p>
                                <p className="messages-container-content-messages-content-admin-msg-text">
                                    gi rứa cu Tư vấn thêm về các dịch vụ và chức năng của phần nào: vd thử đi abcxyz...
                                </p>
                            </div>
                        </div>

                        {/* client 4 */}
                        <div className="messages-container-content-messages-content-client">
                            <div className="messages-container-content-messages-content-client-logo">
                                <img
                                    src="https://play-lh.googleusercontent.com/nlTUhHmVerpGrB5zoARqnusy4GzAXvERR7RDHjMzm2q2wKouTjNzfOlvoRv7wKIlmtE"
                                    alt="logo"
                                />
                            </div>
                            <div className="messages-container-content-messages-content-client-msg">
                                <p className="messages-container-content-messages-content-client-msg-text">đây ku</p>
                                <p className="messages-container-content-messages-content-client-msg-text">
                                    Tư vấn thêm về các dịch vụ và chức năng của phần mềm này cho t hiểu đi man
                                </p>
                            </div>
                        </div>

                        {/* admin 4 */}
                        <div className="messages-container-content-messages-content-admin">
                            <div className="messages-container-content-messages-content-admin-msg">
                                <p style={{ flex: 1 }}></p>
                                <p className="messages-container-content-messages-content-admin-msg-text">gi rứa cu</p>
                            </div>
                            <div className="messages-container-content-messages-content-admin-msg">
                                <p style={{ flex: 1 }}></p>
                                <p className="messages-container-content-messages-content-admin-msg-text">
                                    gi rứa cu Tư vấn thêm về các dịch vụ và chức năng của phần nào: vd thử đi abcxyz...
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="messages-container-content-messages-footer">
                        <input type="text" placeholder="messages..." />
                        <button className="messages-container-content-messages-footer-btn">Gửi</button>
                    </div>
                </div>
                <div className="messages-container-content-iffo"></div>
            </div>
        </div>
    );
}

export default Messages;
