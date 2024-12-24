import React, { useState } from 'react';
import UserLogin from "./jwt.jsx";
import axiosInstance from "../../axios.config.js";
function UpdatePsw() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!currentPassword || !newPassword) {
            setErrorMessage('请填写所有字段');
            return;
        }

        try {
            
            const response = await axiosInstance.post('/user/update_password', {
                username: localStorage.getItem('username'),
                currentPassword: currentPassword,
                newPassword: newPassword,
            });

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setErrorMessage('');
            } else {
                setErrorMessage(response.data.message);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('出现问题，请稍后再试');
            setSuccessMessage('');
        }
        setCurrentPassword('');
        setNewPassword('');
    };

    return (
        <div>
            <UserLogin/>
            <h2>修改密码</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="current-password">当前密码</label>
                    <input
                        type="password"
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="请输入当前密码"
                    />
                </div>
                <div>
                    <label htmlFor="new-password">新密码</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="请输入新密码"
                    />
                </div>
                <button type="submit">更新密码</button>
            </form>
        </div>
    );
}
export default UpdatePsw
