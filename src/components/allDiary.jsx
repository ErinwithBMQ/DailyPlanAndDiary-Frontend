import './css/allDiary.css'
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios.config.js";

function AllDiary() {
    const [diary, setDiary] = useState([]);
    const [sortedDates, setSortedDates] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        axiosInstance.get('/user/get_name')
            .then(response => {
                const newName = response.data.username;
                setUsername(newName);
                console.log("new", newName);

                return axiosInstance.get('/diary/show_diary_by_name', {
                    params: { author: newName },
                });
            })
            .then(response => {
                // 按日期分组日记
                const groupedDiaries = groupDiariesByDate(response.data);

                // 获取排序后的日期
                const sortedDates = Object.keys(groupedDiaries).sort((a, b) => {
                    const dateA = new Date(a);
                    const dateB = new Date(b);
                    return dateA - dateB;
                });

                setDiary(groupedDiaries);
                setSortedDates(sortedDates);
            })
            .catch(error => {
                console.error(error);
                alert('获取日记失败。出现问题。');
            });
    }, []);

    // 按日期分组的函数
    const groupDiariesByDate = (diaries) => {
        return diaries.reduce((acc, diary) => {
            const date = new Date(diary.createdAt).toLocaleDateString(); // 取日期部分（不包括时间）
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(diary);
            return acc;
        }, {});
    };

    return (
        <div className={"all-diary-page"}>
            <button className={"backMain-button"} onClick={() => window.location.href = `/calendar`}>
                返回
            </button>
            <div className={"text-2xl font-semibold mt-16 text-center mb-4 text-blue-300 shadow-amber-50"}>
                日记总览
            </div>
            {sortedDates.length > 0 ? (
                sortedDates.map((date, index) => (
                    <div key={index} className="all-diary-date-group">
                        <div className="date-header">
                            <strong>{date}</strong>
                        </div>
                        {diary[date].map((diaryItem, index) => (
                            <div key={index} className="all-diary-item">
                                <p><strong>标题：</strong>{diaryItem.title}</p>
                                <p><strong>创建时间：</strong>{diaryItem.createdAt}</p>
                                <p><strong>作者：</strong>{diaryItem.author}</p>
                                <div className="">
                                    <p><strong>内容：</strong></p>
                                    <p className="mb-4 mt-2">{diaryItem.content}</p>
                                    {diaryItem.image_id !== 0 && (
                                        <div className={"mb-4"}>
                                            <img
                                                src={`http://106.14.201.119:7001/file/show?id=${diaryItem.image_id}`}
                                                alt="image"
                                                className="image-responsive"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>暂无日记</p>
            )}
        </div>
    );
}

export default AllDiary;
