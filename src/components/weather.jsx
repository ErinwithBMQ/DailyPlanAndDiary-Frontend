import axiosInstance from "../../axios.config.js";
import {useEffect, useState} from "react";

function Weather() {
    const [weather, setWeather] = useState('');
    const [temperature, setTemperature] = useState('');
    const [time, setTime] = useState('');
    useEffect(() => {
        axiosInstance.get('/message/weather')
            .then(response => {
                console.log(response.data);
                setTemperature(response.data.temperature);
                setWeather(response.data.weatherText);
                setTime(response.data.lastUpdate);
            })
    }, [])

    return (
        <div className="bg-white p-4 shadow-amber-50 rounded-2xl flex-col">
            <div>
                城市：南京
            </div>
            <div>
                天气：{weather}
            </div>
            <div>
                温度：{temperature}
            </div>
            <div>
                更新时间：{time}
            </div>
        </div>
    )
}

export default Weather;
