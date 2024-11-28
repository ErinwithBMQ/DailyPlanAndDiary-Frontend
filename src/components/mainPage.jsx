import './css/mainPage.css'

function MainPage() {
    return (
        <div>
            <div className={"text-2xl"}>This is the main page</div>
            <button onClick={() => {
                window.location.href = `/diary`;
            }}>diary
            </button>
            <button onClick={() => {
                window.location.href = `/calendar`;
            }}>calendar
            </button>
        </div>
    )
}

export default MainPage
