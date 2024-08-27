import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./services/PrivateRoutes";
import RoomList from "./pages/RoomList"; // Import RoomList component
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./services/AuthContext";
import ChatRoom from "./pages/ChatRoom";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/" element={<RoomList />} /> {/* Route for Room List */}
                        <Route path="/chat/:roomId" element={<ChatRoom />} /> {/* Route for Chat Room */}
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
