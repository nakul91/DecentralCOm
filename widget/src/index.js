import ReactDOM from 'react-dom/client';
import "./index.css";

function App() {
    return <>
        <div className="wg-flex wg-justify-center wg-items-center wg-min-h-screen loginBg">
            <div className="wg-text-center">
                <h1 className="wg-text-3xl wg-font-bold wg-mb-4">DecentralCom</h1>
                <h4 className="wg-text-md wg-font-bold">Client side demo, start your conversation to contact admin support</h4>

                {/* <img src="your-image.jpg" alt="Image" class="mx-auto rounded-lg" style="max-width: 400px;" /> */}
            </div>
        </div></>
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);