import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BeginPage from "./components/beginPage.jsx";
import Login from "./components/login.jsx";
import Diary from "./components/diary.jsx";
import Calendar from "./components/calendar.jsx";
import Plan from "./components/plan.jsx";

// 动态路由

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<BeginPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/diary" element={<Diary/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
                <Route path="/plan" element={<Plan/>}/>

            </Routes>
        </Router>
    )
}

export default App
