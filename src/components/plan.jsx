import './css/plan.css'
import React, {useState, useEffect} from 'react';
import axiosInstance from "../../axios.config.js";
import UserLogin from "./jwt.jsx";

function Plan() {
    const [planName, setPlanName] = useState("");
    const [planContent, setPlanContent] = useState("");
    const [emergency, setEmergency] = useState("");
    const [ddl, setDdl] = useState("");
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [username, setUsername] = useState("");
    const EMERGENCY_LEVELS = {
        "0": "重要且紧急",
        "1": "重要不紧急",
        "2": "紧急不重要",
        "3": "不重要不紧急",
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const date = params.get('date');
        console.log("Selected date:", date);
        setSelectedDate(date);
    }, []);

    const handleCreatePlan = async () => {
        if (!planName || !planContent || !emergency || !ddl) {
            alert("所有字段均为必填项！");
            return;
        }

        try {
            const response = await axiosInstance.post('/plan/create_plan', {
                title: planName,
                content: planContent,
                createdAt: selectedDate,
                importance: emergency,
                deadLineTime: ddl,
                author: username,
                is_done: false
            });
            console.log("计划成功创建");
            alert('你已经成功创建计划!');
        } catch (error) {
            console.error(error);
            alert('创建失败。出现问题。');
        }

        getPlans();
        // setPlanName("");
        // setPlanContent("");
        // setEmergency("");
        // setDdl("");
    };

    const handlePlanNameChange = (e) => {
        if (e.target.value.length <= 15) {
            setPlanName(e.target.value);
        }
    };

    const handleDdlChange = (e) => {
        if (e.target.value.length <= 15) {
            setDdl(e.target.value);
        }
    };

    const handleViewPlan = (plan) => {
        setSelectedPlan(plan);
    };
// <<<<<<< HEAD
//     const handleEmergencyChange = (e) => {
//         const value = parseInt(e.target.value, 10); // 将字符串转为整数
//         setEmergency(value); // 更新状态，存储整数形式
//     };
//     const getPlans = async () => {
//         try {
//             const response = await axiosInstance.get('http://127.0.0.1:7001/plan/show_plan', {
//                 params: {
//                     author: "admin", // 传递当前用户
//                     createdAt: selectedDate, // 传递选定日期
//                 },
// =======

    const handleCloseDetails = () => {
        setSelectedPlan(null);
    };

    const handleDone = async (id) => {
        try {
            const response = await axiosInstance.get('/plan/finish_plan',
                {
                    params: {
                        id: id,
                    },
                });
            console.log("计划成功完成");
            alert('你已经完成了该计划!');
            location.reload();
        } catch (error) {
            console.error(error);
            alert('完成失败。出现问题。');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.get('/plan/delete_plan',
                {
                    params: {
                        id: id,
                    },
                });
            alert('你已删除该计划。');
            location.reload();
        } catch (error) {
            console.error(error);
            alert('完成失败。出现问题。');
        }
    };

    const getPlans = async () => {
        axiosInstance.get('/user/get_name')
            .then(response => {
                const newName = response.data.username;
                console.log(newName);
                setUsername(newName);
                return axiosInstance.get('/plan/show_plan', {params: {author: newName}});
            })
            .then(response => {
                setPlans(response.data);
            })
            .catch(error => {
                console.error(error);
                alert('获取日记失败。出现问题。');
            });
    };

    useEffect(() => {
        if (selectedDate) {
            getPlans();
        }

    }, [selectedDate]);

    return (
        <div className="plan-page">
            <UserLogin/>
            <button className="backMain-button" onClick={() => window.location.href = `/calendar`}>返回</button>
            <div className="plan-selected-date">
                Date: {selectedDate}
            </div>
            <div className="plan-container">
                <div className="plan-list">
                    <h2 className="plan-title">计划列表</h2>
                    {/*<button className="creation-button" onClick={() => setSelectedPlan(null)}>创建计划*/}
                    {/*</button>*/}
                    <div className="plan-list-content">
                        {plans.length > 0 ? (
                            plans.map((plan, index) => (
                                <div key={index} className="plan-item">
                                    <p className={"mb-2"}><strong>计划名称：</strong>{plan.title}</p>
                                    <p className={"mb-2"}><strong>ddl：</strong>{plan.deadLineTime}</p>
                                    <p><strong>是否完成：</strong>{plan.is_done ? "已完成" : "未完成"}</p>
                                    <button className="viewplan-button" onClick={() => handleViewPlan(plan)}>查看详情
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>暂无计划，创建一个吧！</p>
                        )}
                    </div>
                </div>
                <div className="plan-creation">
                    {selectedPlan ? (
                        <>
                            <h2 className="plan-title">计划详情</h2>
                            <p className={"mb-4"}><strong>计划名称：</strong>{selectedPlan.title}</p>
                            <div className="plan-content-container mb-4">
                                <p className="plan-content-title"><strong>计划内容：</strong></p>
                                <p className="plan-content">{selectedPlan.content}</p>
                            </div>
                            <p className={"mb-4"}><strong>紧急程度：</strong>{EMERGENCY_LEVELS[selectedPlan.importance]}
                            </p>
                            <p className={"mb-4"}><strong>DDL：</strong>{selectedPlan.deadLineTime}</p>
                            <p className={"mb-4"}><strong>是否完成：</strong>{selectedPlan.is_done ? "已完成" : "未完成"}
                            </p>
                            <button className="done-button" onClick={() => handleDone(selectedPlan.id)}>我已完成
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(selectedPlan.id)}>删除计划
                            </button>
                            <button className="close-details-button" onClick={handleCloseDetails}>返回</button>
                        </>
                    ) : (
                        <>
                            <h2 className="plan-title">添加计划</h2>
                            <div className="title-input-container">
                                <input
                                    type="text"
                                    id="plan_name"
                                    name="plan_name"
                                    placeholder="计划名称"
                                    value={planName}
                                    onChange={handlePlanNameChange}
                                />
                                <span className="title-counter">{planName.length}/15</span>
                            </div>
                            <textarea
                                className="plan-content-textarea"
                                placeholder="计划内容"
                                value={planContent}
                                onChange={(e) => setPlanContent(e.target.value)}
                            />
                            <div className="emergency-input-container">
                                <select
                                    id="emergency"
                                    name="emergency"
                                    value={emergency}
                                    onChange={(e) => setEmergency(e.target.value)}
                                >
                                    <option value="">选择紧急程度</option>
                                    <option value="0">重要且紧急</option>
                                    <option value="1">重要不紧急</option>
                                    <option value="2">紧急不重要</option>
                                    <option value="3">不重要不紧急</option>
                                </select>
                            </div>
                            <div className="ddl-input-container">
                                <input
                                    type="text"
                                    id="ddl"
                                    name="ddl"
                                    placeholder="ddl，输入格式为[年.月.日]"
                                    value={ddl}
                                    onChange={handleDdlChange}
                                />
                                <span className="ddl-counter">{ddl.length}/15</span>
                            </div>
                            <button className="creation-button" onClick={handleCreatePlan}>创建计划</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Plan;
