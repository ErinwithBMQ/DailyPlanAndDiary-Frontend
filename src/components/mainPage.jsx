import './css/mainPage.css'
import React from "react";

function MainPage() {
    return (
        <div className="main-page-container">
            <div className="main-navbar">
                <h1 className="main-navbar-title">Daily Plan And Diary</h1>
            </div>
            <div className="main-page">
                <div className="button-container">
                    <button onClick={() => {
                        window.location.href = `/diary`;
                    }}>Diary
                    </button>
                    <button onClick={() => {
                        window.location.href = `/calendar`;
                    }}>Calendar
                    </button>
                    <button onClick={() => {
                        window.location.href = `/plan`;
                    }}>Plan
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MainPage