import './css/beginPage.css'
import React from "react";

function BeginPage() {
    return (
        <div className="begin-page-container">
            <div className="begin-page">
                <div className="header">
                    <h1 className="site-title">Daily Plan And Diary</h1>
                </div>
                <div className="begin-button-container">
                    
                    <button onClick={() => {
                        window.location.href = `/login`;
                    }}>登录/注册
                    </button>
                    <button onClick={() => {
                        window.location.href = `/mainPage`;
                    }}>使用指南
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BeginPage