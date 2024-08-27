import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PrivateRoutes from "./services/PrivateRoutes"
import ChatRoom from "./pages/ChatRoom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { AuthProvider } from "./services/AuthContext"

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element = {<LoginPage/>}></Route>
                    <Route path="/register" element = {<RegisterPage/>}></Route>
                     <Route element = {<PrivateRoutes/>}>
                        <Route path="/" element = {<ChatRoom/>}></Route>
                     </Route>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App