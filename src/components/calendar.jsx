import React, { useEffect, useRef, useState } from 'react'
import './css/calendar.css'
import Pikaday from 'pikaday'
import 'pikaday/css/pikaday.css'

function calendar() {
    const pikadayRef = useRef(null)
    const [date, setDate] = useState('')
    useEffect(() => {
        const picker = new Pikaday({
            field: pikadayRef.current,
            bound: false,
            container: pikadayRef.current,
            format: 'YYYY-MM-DD',
            onSelect: () => {
                setDate(picker.toString());
            }
        });

        return () => {
            picker.destroy();
        };
    }, []);

    const handleDataChoose = (path) => {
        if (!date) {
            alert("请选择日期");
            return;
        }
        window.location.href = `${path}?date=${date}`;
    };

    return (
        <div className="calendar-page">
            <div className="main-navbar">
                <h1 className="main-navbar-title">Daily Plan And Diary</h1>
                <button className="backLog-button" onClick={() => window.location.href = `/`}>退出登录</button>
            </div>
            <div className="calendar-container">
                <div className="calendar" ref={pikadayRef}></div>
            </div>
            <div className="selected-date">
                Selected Date: {date}
            </div>
            <div className="tobutton-container">
                <button className="todiary-button" onClick={() => handleDataChoose(`/diary`)}>日记</button>
                <button className="toplan-button" onClick={() => handleDataChoose(`/plan`)}>计划</button>
            </div>
        </div>
    )
}

export default calendar