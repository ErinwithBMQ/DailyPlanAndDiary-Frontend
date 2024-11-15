import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from "./components/mainPage.jsx";
import Diary from "./components/diary.jsx";

// 动态路由

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/diary" element={<Diary/>}/>
            </Routes>
        </Router>
    )
}

export default App
