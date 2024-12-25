import React, {useState} from 'react';
import UserLogin from "./jwt.jsx";
import axiosInstance from "../../axios.config.js";

function UpdatePsw() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!currentPassword || !newPassword) {
            alert("密码不得为空。")
            return;
        }

        if (newPassword !== repeatPassword) {
            alert('两次输入的密码不一致。');
            setCurrentPassword('');
            setNewPassword('');
            setRepeatPassword('');
            return;
        }

        try {

            const response = await axiosInstance.post('/user/update_password', {
                username: localStorage.getItem('username'),
                currentPassword: currentPassword,
                newPassword: newPassword,
            });

            if (response.data.success) {
                alert('密码修改成功！')
            } else {
                alert('您填写的密码与您的密码不匹配。');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('出现问题，请稍后再试。');
        }
        setCurrentPassword('');
        setNewPassword('');
        setRepeatPassword('');
    };

    return (
        <div>
            <button className="backMain-button" onClick={() => window.location.href = `/calendar`}>
                返回
            </button>
            <UserLogin/>
            <div className="mt-24">

                <h2 className={"text-center text-2xl font-bold mb-4"}>修改密码</h2>
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
                    <div>
                        <label htmlFor="repeat-password">再次输入新密码</label>
                        <input
                            type="password"
                            id="repeat-password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            placeholder="请再次输入新密码"
                        />
                    </div>
                    <button type="submit">更新密码</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePsw
