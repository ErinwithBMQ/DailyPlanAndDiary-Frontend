import './css/allDiary.css'
import React, {useEffect, useState} from "react";
import axiosInstance from "../../axios.config.js";

function AllDiary() {
    const [diary, setDiary] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        axiosInstance.get('/user/get_name')
            .then(response => {
                const newName = response.data.username;
                setUsername(newName);
                console.log("new", newName);

                return axiosInstance.get('/diary/show_diary_by_name',
                    {
                        params: {
                            author: newName,
                        }
                    });
            })
            .then(response => {
                setDiary(response.data);
            })
            .catch(error => {
                console.error(error);
                alert('获取日记失败。出现问题。');
            });
    }, [])

    return (
        <div className={"all-diary-page"}>
            <button className={"backMain-button"} onClick={() => window.location.href = `/calendar`}>
                返回
            </button>
            <div className={"text-2xl font-semibold mt-16 text-center mb-4 text-blue-300 shadow-amber-50"}>日记总览
            </div>
            {diary.length > 0 ? (
                diary.map((diary, index) => (
                    <div key={index} className="all-diary-item">
                        <p><strong>标题：</strong>{diary.title}</p>
                        <p><strong>创建时间：</strong>{diary.createdAt}</p>
                        <p><strong>作者：</strong>{diary.author}</p>
                        <div className="">
                            <p className=""><strong>内容：</strong></p>
                            <p className="mb-4 mt-2">{diary.content}</p>
                            {diary.image_id !== 0 && <div className={"mb-4"}>
                                <img src={`http://106.14.201.119:7001/file/show?id=${diary.image_id}`}
                                     alt="image"
                                     className="image-responsive"/>
                            </div>}
                        </div>
                    </div>
                ))
            ) : (
                <p>暂无日记</p>
            )}
        </div>
    )
}

export default AllDiary
