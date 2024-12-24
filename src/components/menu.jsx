import './css/menu.css'
import {useEffect, useState} from "react";
import axiosInstance from "../../axios.config.js";

function Menu() {
    const [username, setUser_name] = useState('');

    useEffect(() => {
        axiosInstance.get('/user/get_name')
            .then(response => {
                setUser_name(response.data.username);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);

    const handleDataChoose = (path) => {
        let date = localStorage.getItem('selectedDate');
        window.location.href = `${path}?date=${date}`;
    };

    return (
        <ul className="shell">
            <li className="button0">
                <span>开始创建</span>
                <ul>
                    <li onClick={() => {
                        handleDataChoose(`/diary`)
                    }}>创建日记
                    </li>
                    <li onClick={() => {
                        handleDataChoose(`/plan`)
                    }}>创建计划
                    </li>
                </ul>
            </li>
            <li className="button0">
                <span onClick={() => {
                    window.location.href = `/alldiary`;
                }}>日记总览</span>
            </li>
            <div className={"username-display"}>
                Welcome, {username}
            </div>
            <li className="button0">
                <span onClick={() => {
                    window.location.href = `/message`;
                }}>个人信息</span>
            </li>
            <li className="button0">
                <span>其他</span>
                <ul>
                    <li onClick={() => {
                        window.location.href = `/updatepsw`;
                    }}>修改密码
                    </li>
                    <li onClick={() => {
                        window.location.href = `/`;
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                    }}>退出登录
                    </li>
                </ul>
            </li>
        </ul>
    )
}

export default Menu;
