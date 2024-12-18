import './css/diary.css'
import React, {useState, useEffect} from 'react';
import axiosInstance from "../../axios.config.js";
import UserLogin from "./jwt.jsx";
import useUsername from "./useUsername.jsx";

// import {s} from "vite/dist/node/types.d-aGj9QkWt.js";

function Diary() {
    const [diaryTitle, setDiaryTitle] = useState("");
    const [diaryContent, setDiaryContent] = useState("");
    const [diaries, setDiaries] = useState([]);
    const [showCreation, setShowCreation] = useState(false);
    const [selectedDiary, setSelectedDiary] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const username = useUsername();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const date = params.get('date');
        setSelectedDate(date);
    }, []);

    const handleCreateDiary = async () => {
        if (!diaryTitle || !diaryContent) {
            setErrorMessage("标题或内容不能为空，创建日记失败");
            return;
        }

        const newDiary = {
            title: diaryTitle,
            content: diaryContent,
            created_at: selectedDate,
            author: username,
        };
        try {
            const response = await axiosInstance.post('/diary/create_diary', {
                title: diaryTitle,
                content: diaryContent,
                createdAt: selectedDate,
                author: username,
            });
            console.log("日记成功创建");
            alert('你已经成功创建日记!');
        } catch (error) {
            console.error(error);
            alert('创建失败。出现问题。');
        }
        // setDiaries([...diaries, newDiary]);
        setShowCreation(false);
        await getDiaries();
    };

    const getDiaries = async () => {
        try {
            console.log("username:", username);
            const response = await axiosInstance.get('/diary/show_diary', {
                params: {
                    author: username,
                }
            });
            setDiaries(response.data);
        } catch (error) {
            console.error(error);
            alert('获取日记失败。出现问题。');
        }
    };

    const handleViewDiary = (diary) => {
        setSelectedDiary(diary);
        setShowCreation(false);
    };

    const handleTitleChange = (e) => {
        if (e.target.value.length <= 20) {
            setDiaryTitle(e.target.value);
        }
    };

    useEffect(() => {
        if (selectedDate) {
            getDiaries();
        }
    }, [selectedDate]);

    return (
        <div className="diary-page">
            <UserLogin/>
            <button className="backMain-button" onClick={() => window.location.href = `/calendar`}>返回</button>
            <div className="diary-selected-date">
                Date: {selectedDate}
            </div>
            <div className="diary-container">
                <div className="diary-list">
                    <h2 className="diary-title">日记列表</h2>
                    <button className="createDiary-button" onClick={() => setShowCreation(true)}>创建日记</button>
                    <div className="diary-list-content">
                        {diaries.length > 0 ? (
                            diaries.map((diary, index) => (
                                <div key={index} className="diary-item">
                                    <p><strong>标题：</strong>{diary.title}</p>
                                    <button className="view-button" onClick={() => handleViewDiary(diary)}>查看详情
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>暂无日记，请创建！</p>
                        )}
                    </div>
                </div>
                <div className="diary-creation">
                    {showCreation ? (
                        <>
                            <h2 className="diary-title">添加日记</h2>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <div className="title-input-container">
                                <input
                                    type="text"
                                    id="diary_title"
                                    name="diary_title"
                                    placeholder="日记标题"
                                    value={diaryTitle}
                                    onChange={handleTitleChange}
                                />
                                <span className="title-counter">{diaryTitle.length}/20</span>
                            </div>
                            <textarea
                                className="diary-content-textarea"
                                placeholder="日记内容"
                                value={diaryContent}
                                onChange={(e) => setDiaryContent(e.target.value)}
                            />
                            <button className="createDiary2-button" onClick={handleCreateDiary}>创建日记</button>
                        </>
                    ) : selectedDiary ? (
                        <>
                            <h2 className="diary-title">日记详情</h2>
                            <p><strong>标题：</strong>{selectedDiary.title}</p>
                            <p><strong>创建时间：</strong>{selectedDiary.createdAt}</p>
                            <p><strong>作者：</strong>{selectedDiary.author}</p>
                            <div className="diary-content-container">
                                <p className="diary-content-title"><strong>内容：</strong></p>
                                <p className="diary-content">{selectedDiary.content}</p>
                            </div>
                        </>
                    ) : (
                        <p>请选择一个日记或创建一个新日记。</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Diary;
