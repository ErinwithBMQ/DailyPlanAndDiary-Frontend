import React, {useState} from 'react';
import './css/login.css';
import axiosInstance from "../../axios.config.js";

function Login() {
    const [showRegister, setShowRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            alert('用户名和密码不得为空！');
            return;
        }
        try {
            const response = await axiosInstance.get('/user/find_user', {
                params: {
                    username,
                },
            });

            console.log("检测是否有用户");

            if (response.data !== false) {
                console.log(response.data, "检测到用户信息");
                const response2 = await axiosInstance.post('/user/password', {
                    username,
                    password,
                });
                if (response2.data !== false) {
                    alert('你已经成功登录!');
                    console.log(response2.data);
                    localStorage.setItem('token', response2.data.token);
                    window.location.href = `/calendar`;
                } else {
                    console.log("密码错误");
                    alert('密码错误。');
                }

            } else {
                console.log("未检测到用户信息");
                alert('用户不存在。请先注册。');
            }

        } catch (error) {
            console.error(error);
            alert('登录失败。出现问题。');
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            alert('用户名和密码不得为空！');
            return;
        }
        console.log(username, password);

        try {
            const response = await axiosInstance.get('/user/find_user', {
                params: {
                    username,
                },
            });

            console.log("检测是否有用户");

            if (response.data !== false) {
                console.log(response.data, "用户已存在");
                alert('用户已存在。请更换用户名。');
                return;
            }

        } catch (error) {
            console.error(error);
            alert('创建失败。出现问题。');
        }


        if (password !== repeatPassword) {
            alert('两次输入的密码不一致。');
            return;
        }

        try {
            const response = await axiosInstance.post('/user/create_user', {
                username,
                password,
            });
            console.log(response.data.username, "用户成功创建");
            alert('你已经成功创建用户!');
            const response2 = await axiosInstance.post('/user/password', {
                username,
                password,
            });
            console.log(response2.data);
            localStorage.setItem('token', response2.data.token);
            setShowRegister(false);
            window.location.href = `/calendar`;
        } catch (error) {
            console.error(error);
            alert('创建失败。');
        }
    };

    return (
        <div className="login-page">
            <button className="backBegin-button" onClick={() => window.location.href = `/`}>取消登录</button>
            <div className="login-container">
                {!showRegister ? (

                    <div className="login-form">
                        <form onSubmit={handleLogin}>
                            <h2 className="text-2xl center-text">登录</h2>
                            <label htmlFor="username">用户名:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>

                            <label htmlFor="password">密码:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>

                            <button type={"submit"}>登录</button>
                        </form>

                        <button onClick={() => {
                            setShowRegister(true);
                        }}>注册账号
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleRegister}>
                        <div className="register-form">
                            <button className="back-button" onClick={() => setShowRegister(false)}>返回</button>
                            <h2 className="text-2xl center-text">注册</h2>
                            <label htmlFor="register-username">用户名:</label>
                            <input
                                type="text"
                                id="register-username"
                                name="register-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>

                            <label htmlFor="register-password">密码:</label>
                            <input
                                type="password"
                                id="register-password"
                                name="register-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>

                            <label htmlFor="register-password">再次输入密码:</label>
                            <input
                                type="password"
                                id="repeat-password"
                                name="repeat-password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}/>

                            <button type="submit">注册并登录</button>
                        </div>
                    </form>
                )}
            </div>
        </div>

    );
}

export default Login;
