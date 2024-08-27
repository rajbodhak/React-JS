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
        getUserOnLoad();
    }, []);

    const getUserOnLoad = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error("Failed to retrieve user details:", error);
            if (error.code === 401) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        console.log("CREDS: ", credentials);
    
        try {
            // Attempt to create a session with the provided credentials
            await account.createEmailPasswordSession(
                credentials.email,
                credentials.password
            );
    
            // If successful, fetch user details
            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            // Handle specific errors
            if (error.code === 401) {
                console.error("Invalid credentials. Please check the email and password.");
                alert("Invalid credentials. Please check the email and password.");
            } else {
                console.error("An error occurred during login:", error);
                alert("An error occurred during login. Please try again.");
            }
        }
    };
    

    const handleLogout = async () => {
        const response = await account.deleteSession("current");
        setUser(null);
    };

    const handleRegister = async (e, credentials) => {
        e.preventDefault();
        console.log("Handle Register triggered!", credentials);

        if (credentials.password1 !== credentials.password2) {
            alert("Password did not match!");
            return;
        }

        try {
            let response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
            );
            console.log("User registered!", response);

            await account.createEmailPasswordSession(
                credentials.email,
                credentials.password1
            );

            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error(error);
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
