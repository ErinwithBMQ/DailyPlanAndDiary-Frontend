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
        <div>
            <div className="calendar" ref={pikadayRef}></div>
                <div className="selected-date">
                    Selected Date: {date}
                </div>
        </div>
    )
}

export default calendar