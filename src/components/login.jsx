import React, { useState } from 'react';
import './css/login.css';

function Login() {
    const [showRegister, setShowRegister] = useState(false);

    const handleRegister = () => {
        setShowRegister(false);
        window.location.href = `/mainPage`;
    };

    return (
        <div className="login-page">
            <button className="backBegin-button" onClick={() => window.location.href = `/`}>取消登录</button>
            <div className="login-container">
                {!showRegister ? (
                    <div className="login-form">
                        <h2 className="text-2xl center-text">登录</h2>
                        <label htmlFor="username">用户名:</label>
                        <input type="text" id="username" name="username" />

                        <label htmlFor="password">密码:</label>
                        <input type="password" id="password" name="password" />

                        <button onClick={() => {
                            window.location.href = `/mainPage`;
                        }}>登录
                        </button>

                        <button onClick={() => {
                            setShowRegister(true);
                        }}>注册账号
                        </button>
                    </div>
                ) : (
                    <div className="register-form">
                        <button className="back-button" onClick={() => setShowRegister(false)}>返回</button>
                        <h2 className="text-2xl center-text">注册</h2>
                        <label htmlFor="register-username">用户名:</label>
                        <input type="text" id="register-username" name="register-username" />

                        <label htmlFor="register-password">密码:</label>
                        <input type="password" id="register-password" name="register-password" />

                        <button onClick={handleRegister}>注册并登录</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;