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

    return (
        <div className="calendar-page">
            <button className="backMain-button" onClick={() => window.location.href = `/mainPage`}>返回</button>
            <div className="calendar-container">
                <div className="calendar" ref={pikadayRef}></div>
            </div>
            <div className="selected-date">
                Selected Date: {date}
            </div>
            <div className="tobutton-container">
                <button className="todiary-button" onClick={() => window.location.href = `/diary`}>日记</button>
                <button className="toplan-button" onClick={() => window.location.href = `/plan`}>计划</button>
            </div>
        </div>
    )
}

export default calendar