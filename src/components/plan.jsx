import './css/plan.css'
import './css/diary.css'
import React, {useState} from "react";

function Plan() {
    //存储输入的计划和展示列表
    const [planName, setPlanName] = useState("");
    const [planContent, setPlanContent] = useState("");
    const [emergency, setEmergency] = useState("");
    const [ddl, setDdl] = useState("");
    const [plans, setPlans] = useState([]); //存储所有计划

    //保存计划到列表
    const handleCreatePlan = () => {
        const newPlan = {
            name: planName,
            content: planContent,
            emergency,
            ddl,
        };

        //将新计划添加到计划列表
        setPlans([...plans, newPlan]);

        //清空输入框
        setPlanName("");
        setPlanContent("");
        setEmergency("");
        setDdl("");
    };

    return (
        <div>
            <button className="back-button" onClick={() => window.location.href = `/mainPage`}>返回</button>

            <div className="plan-creation-container">
                <div className="plan-creation">
                    <h2 className="plan-title">添加计划</h2>
                    <input
                        type="text"
                        id="plan_name"
                        name="plan_name"
                        placeholder="计划名称"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)} // 更新状态
                    />
                    <textarea
                        rows="5"
                        cols="60"
                        placeholder="计划内容"
                        value={planContent}
                        onChange={(e) => setPlanContent(e.target.value)} // 更新状态
                    />
                    <input
                        type="text"
                        id="emergency"
                        name="emergency"
                        placeholder="紧急程度"
                        value={emergency}
                        onChange={(e) => setEmergency(e.target.value)} // 更新状态
                    />
                    <input
                        type="text"
                        id="ddl"
                        name="ddl"
                        placeholder="ddl"
                        value={ddl}
                        onChange={(e) => setDdl(e.target.value)} // 更新状态
                    />
                    <button className= "creation-button" onClick={handleCreatePlan}>创建计划</button>
                </div>
            </div>

            <div className="plan-list-container">
                <div className="plan-list">
                    <h2 className="plan-title">计划列表</h2>
                    {plans.length > 0 ? (
                        plans.map((plan, index) => (
                            <div key={index} style={{marginBottom: "1rem", border: "1px solid #ddd", padding: "1rem"}}>
                                <p><strong>计划名称：</strong>{plan.name}</p>
                                <p><strong>计划内容：</strong>{plan.content}</p>
                                <p><strong>紧急程度：</strong>{plan.emergency}</p>
                                <p><strong>DDL：</strong>{plan.ddl}</p>
                            </div>
                        ))
                    ) : (
                        <p>暂无计划，请创建！</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Plan;
