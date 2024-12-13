import './css/plan.css'
import React, { useState, useEffect } from "react";
import UserLogin from "./jwt.jsx";

function Plan() {
    const [planName, setPlanName] = useState("");
    const [planContent, setPlanContent] = useState("");
    const [emergency, setEmergency] = useState("");
    const [ddl, setDdl] = useState("");
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const date = params.get('date');
        setSelectedDate(date);
    }, []);

    const handleCreatePlan = () => {
        if (!planName || !planContent || !emergency || !ddl) {
            alert("所有字段均为必填项！");
            return;
        }

        const newPlan = {
            name: planName,
            content: planContent,
            emergency,
            ddl,
        };

        setPlans([...plans, newPlan]);

        setPlanName("");
        setPlanContent("");
        setEmergency("");
        setDdl("");
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

    const handleCloseDetails = () => {
        setSelectedPlan(null);
    };

    return (
        <div className="plan-page">
            <UserLogin />
            <button className="backMain-button" onClick={() => window.location.href = `/calendar`}>返回</button>
            <div className="plan-selected-date">
                Date: {selectedDate}
            </div>
            <div className="plan-container">
                <div className="plan-list">
                    <h2 className="plan-title">计划列表</h2>
                    <button className="createPlan-button" onClick={() => setSelectedPlan(null)}>创建计划</button>
                    <div className="plan-list-content">
                        {plans.length > 0 ? (
                            plans.map((plan, index) => (
                                <div key={index} className="plan-item">
                                    <p><strong>计划名称：</strong>{plan.name}</p>
                                    <button className="viewplan-button" onClick={() => handleViewPlan(plan)}>查看详情</button>
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
                            <p><strong>计划名称：</strong>{selectedPlan.name}</p>
                            <div className="plan-content-container">
                                <p className="plan-content-title"><strong>计划内容：</strong></p>
                                <p className="plan-content">{selectedPlan.content}</p>
                            </div>
                            <p><strong>紧急程度：</strong>{selectedPlan.emergency}</p>
                            <p><strong>DDL：</strong>{selectedPlan.ddl}</p>
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
                                    <option value="重要且紧急">重要且紧急</option>
                                    <option value="重要不紧急">重要不紧急</option>
                                    <option value="紧急不重要">紧急不重要</option>
                                    <option value="不重要不紧急">不重要不紧急</option>
                                </select>
                            </div>
                            <div className="ddl-input-container">
                                <input
                                    type="text"
                                    id="ddl"
                                    name="ddl"
                                    placeholder="ddl"
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