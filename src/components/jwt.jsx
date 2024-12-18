import {useEffect, useState} from 'react';
import axiosInstance from '/axios.config.js'

// 用于身份验证。在需要身份验证的界面，直接调用组件即可

const UserLogin = () => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('user/get_name'); // 注意这里使用的是相对路径
                console.log('身份校验成功');
                console.log(response.data);
                setUsername(response.data.username);
                localStorage.setItem('user', username);
                return response.data;
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProtectedData();
    }, []);

    return (
        <div>

        </div>
    );
};

export default UserLogin;
