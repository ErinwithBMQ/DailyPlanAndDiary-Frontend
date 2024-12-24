import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BeginPage from "./components/beginPage.jsx";
import Login from "./components/login.jsx";
import Diary from "./components/diary.jsx";
import Calendar from "./components/calendar.jsx";
import Plan from "./components/plan.jsx";
import AllDiary from "./components/allDiary.jsx";
import Message from "./components/message.jsx";
import UpdatePsw from "./components/updatepsw.jsx";

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
                <Route path="/alldiary" element={<AllDiary/>}/>
                <Route path="/message" element={<Message/>}/>
                <Route path="/updatepsw" element={<UpdatePsw/>}/>
            </Routes>
        </Router>
    )
}

export default App
