import './css/message.css'
import {useEffect, useState} from "react";
import axiosInstance from "../../axios.config.js";

function Message() {
    const [username, setUsername] = useState('');
    const [diaryNum, setDiaryNum] = useState(0);
    const [planNum, setPlanNum] = useState(0);
    const [planDoneNum, setPlanDoneNum] = useState(0);

    useEffect(() => {
        axiosInstance.get('/user/get_name')
            .then(response => {
                const name = response.data.username;
                setUsername(name);
                return axiosInstance.get('/message/countDiariesByAuthor', {
                    params: {author: name},
                });
            }).then(response => {
            setDiaryNum(response.data);
        })
            .catch(error => {
                console.error(error);
                alert('获取失败。出现问题。');
            });
    }, []);

    useEffect(() => {
        axiosInstance.get('/user/get_name')
            .then(response => {
                const name = response.data.username;
                setUsername(name);
                return axiosInstance.get('/message/countPlansByAuthor', {
                    params: {author: name},
                });
            }).then(response => {
            setPlanNum(response.data);
        })
            .catch(error => {
                console.error(error);
                alert('获取失败。出现问题。');
            });
    }, []);


    useEffect(() => {
        axiosInstance.get('/user/get_name')
            .then(response => {
                const name = response.data.username;
                setUsername(name);
                return axiosInstance.get('/message/countFinishedPlansByAuthor', {
                    params: {author: name},
                });
            }).then(response => {
            setPlanDoneNum(response.data);
        })
            .catch(error => {
                console.error(error);
                alert('获取失败。出现问题。');
            });
    }, []);


    return (
        <div>
            <div>
                <button className="backMain-button" onClick={() => window.location.href = `/calendar`}>
                    返回
                </button>
                <div className="bg-white content-center justify-center p-4 w-fit rounded shadow-amber-50 mt-24">
                    <div className="">
                        <div className="">
                            欢迎回来，{username}！
                        </div>
                        <div className="">
                            您目前有 {diaryNum} 篇日记，{planNum} 个计划，{planDoneNum} 个计划已完成。
                        </div>
                        {planNum - planDoneNum > 0 && (
                            <div className="">
                                您还有 {planNum - planDoneNum} 个计划未完成。记得及时完成计划啊！
                            </div>
                        )}
                        {planNum - planDoneNum === 0 && (
                            <div className="">
                                您的计划已经全部完成！
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message
