import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Application from "./pages/Application";


const AppRouter = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/app" element={<Application />} />
                </Routes>
            </AuthProvider>

        </Router>
    );
};

export default AppRouter;
