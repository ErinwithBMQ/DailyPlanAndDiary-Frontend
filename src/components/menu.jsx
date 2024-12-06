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
    return (
        <ul className="shell">
            <li className="button0">
                <span>我的消息</span>
                <ul>
                    <li onClick={() => {

                    }}>评论我的
                    </li>
                    <li onClick={() => {

                    }}>收到的赞
                    </li>
                </ul>
            </li>
            <li className="button0">
                <span onClick={() => {

                }}>我的帖子</span>
            </li>
            <div className={"username-display"}>
                Welcome, {username}
            </div>
            <li className="button0">
                <span>我的互动</span>
                <ul>
                    <li onClick={() => {

                    }}>我的点赞
                    </li>
                    <li onClick={() => {

                    }}>我的评论
                    </li>
                </ul>
            </li>
            <li className="button0">
                <span>关于我</span>
                <ul>
                    <li onClick={() => {

                    }}>个人信息
                    </li>
                    <li onClick={() => {
                        window.location.href = `/`;
                        localStorage.removeItem('token');
                    }}>退出登录
                    </li>
                </ul>
            </li>
        </ul>
    )
}

export default Menu;
