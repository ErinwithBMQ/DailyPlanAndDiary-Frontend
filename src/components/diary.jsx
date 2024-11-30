import './css/diary.css'
import React from 'react';

function Diary() {
    return (
        <div className="diary-page">
            <button className="back-button" onClick={() => window.location.href = `/mainPage`}>返回</button>
            <div className="diary-container">
                <div className="diary-list">
                    <h2 className="diary-title">日记列表</h2>
                    {/* 这里可以添加日记列表项 */}
                    <ul>
                        <li>日记 1</li>
                        <li>日记 2</li>
                        <li>日记 3</li>
                    </ul>
                </div>
                <div className="diary-content">
                    <h2 className="diary-title">日记内容</h2>
                    {/* 这里可以显示选中的日记内容 */}
                    <p>这是日记内容...</p>
                </div>
            </div>
        </div>
    )
}

export default Diary;