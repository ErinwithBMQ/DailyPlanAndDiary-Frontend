import React, { useEffect, useRef } from 'react'
import './css/calendar.css'
import Pikaday from 'pikaday'
import 'pikaday/css/pikaday.css'

function calendar() {
    const pikadayRef = useRef(null)

    useEffect(() => {
        const picker = new Pikaday({
            field: pikadayRef.current,
            format: 'YYYY-MM-DD',
        });

        return () => {
            picker.destroy();
        };
    }, []);

    return (
        <div>
            {/* <div className={"text-2xl"}>Calendar</div> */}
            <input className='calendar' type="text" ref={pikadayRef} placeholder='Select a date' />
        </div>
    )
}

export default calendar