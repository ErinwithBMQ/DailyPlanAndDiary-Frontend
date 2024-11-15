import './css/mainPage.css'

function MainPage() {
    return (
        <div>
            <div className={"text-2xl"}>This is the main page</div>
            <button onClick={() => {
                window.location.href = `/diary`;
            }}>enter
            </button>
        </div>
    )
}

export default MainPage
