import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from "./components/mainPage.jsx";
import Login from "./components/login.jsx";
import Diary from "./components/diary.jsx";
import Calendar from "./components/calendar.jsx";


// 动态路由

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/diary" element={<Diary/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
            </Routes>
        </Router>
    )
}

export default App
