import { createContext, useEffect, useState, useContext } from "react";
import { account } from "./appwriteConfig";
import { useNavigate } from "react-router";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let accountDetails = await account.get();
                setUser(accountDetails);
            } catch (error) {
                console.error("Failed to retrieve user details:", error);
                if (error.code === 401) {
                    // Redirect to login if unauthorized
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        try {
            await account.createEmailPasswordSession(credentials.email, credentials.password);
            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error("An error occurred during login:", error);
            alert(error.message || "An error occurred during login. Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("An error occurred during logout:", error);
            alert(error.message || "An error occurred during logout. Please try again.");
        }
    };

    const handleRegister = async (e, credentials) => {
        e.preventDefault();
        if (credentials.password1 !== credentials.password2) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await account.create(ID.unique(), credentials.email, credentials.password1, credentials.name);
            await account.createEmailPasswordSession(credentials.email, credentials.password1);
            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error("An error occurred during registration:", error);
            alert(error.message || "An error occurred during registration. Please try again.");
        }
    };

    const contextData = {
        user,
        handleUserLogin,
        handleLogout,
        handleRegister,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p className="text-white text-2xl p-4 text-center">Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
