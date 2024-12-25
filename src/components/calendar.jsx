import React, {useEffect, useRef, useState} from 'react'
import './css/calendar.css'
import Pikaday from 'pikaday'
import 'pikaday/css/pikaday.css'
import Menu from "./menu.jsx";
import axiosInstance from "../../axios.config.js";

function calendar() {
    const pikadayRef = useRef(null)
    const [date, setDate] = useState('')
    const [plan, setPlan] = useState([])
    const [formattedDate, setFormattedDate] = useState('');
    useEffect(() => {
        const picker = new Pikaday({
            field: pikadayRef.current,
            bound: false,
            container: pikadayRef.current,
            format: 'YYYY-MM-DD',
            onSelect: () => {
                setDate(picker.toString());
                localStorage.setItem('selectedDate', picker.toString());
            }
        });

        // 设置默认日期为今天
        const today = new Date();
        picker.setDate(today);
        setDate(picker.toString());

        localStorage.setItem('selectedDate', picker.toString());

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

    useEffect(() => {
        axiosInstance.get('/user/get_name')
            .then(response => {
                const newName = response.data.username;
                console.log("new", newName);

                return axiosInstance.get('/plan/find_ddl',
                    {
                        params: {
                            author: newName,
                        }
                    });
            })
            .then(response => {
                setPlan(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
                alert('获取日记失败。出现问题。');
            });
    }, [date])

    return (
        <div className="calendar-page">
            <div className="calendar-container">
                <div className="calendar" ref={pikadayRef}></div>
            </div>
            <div className="selected-date">
                Selected Date: {date}
            </div>

            {plan.length > 0 && (
                <div>
                    你还有{plan.length}个计划未完成，赶快去完成吧！
                </div>
            )}

            <div className="tobutton-container">
                <button className="todiary-button" onClick={() => handleDataChoose(`/diary`)}>日记</button>
                <button className="toplan-button" onClick={() => handleDataChoose(`/plan`)}>计划</button>
            </div>
            <Menu/>
        </div>
    )
}

export default calendar
