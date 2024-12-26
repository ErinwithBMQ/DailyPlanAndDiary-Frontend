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
        <div className="weather-container">
            <div className="weather-title">今日天气</div>
            <div className="weather-info">
                城市：南京
            </div>
            <div className="weather-info">
                天气：{weather}
            </div>
            <div className="weather-info">
                温度：{temperature}
            </div>
            <div className="weather-info">
                更新时间：{time}
            </div>
        </div>
    )
}

export default Weather;
