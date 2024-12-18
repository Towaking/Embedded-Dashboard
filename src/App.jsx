
import {Dashboard} from "./pages/Dashboard.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Sidebar} from "./component/Sidebar.jsx";

function App() {


  return (
    <BrowserRouter>
        <div className='flex w-screen font-poppins'>
            <Sidebar />
            <div className='flex-grow '>
                <Routes>
                    <Route path="/" element={<Dashboard /> } />
                </Routes>
            </div>
        </div>

    </BrowserRouter>
  )
}

export default App
