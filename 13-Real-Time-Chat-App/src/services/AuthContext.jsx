import {createContext, useEffect, useState, useContext} from "react";
import {account} from "./appwriteConfig";
import {useNavigate} from "react-router";
import {ID} from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ childern }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserOnLoad();
    }, []);

    const getUserOnLoad  = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails)
        } catch (error) {
            console.error(error)
            setLoading(false);
        }
    };

    const handleUserLogin = async(e, credentials) => {
        e.preventDefault();
        console.log("CREDS: ", credentials);

        try {
            let responce = await account.createEmailPasswordSession(
                credentials.email,
                credentials.password
            );

            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        const responce = await account.deleteSession("current");
        setUser(null);
    };

    const handleRegister = async (e, credentials) => {
        e.preventDefault();
        console.log("Handle Register triggered!", credentials);

        if(credentials.password1 !== credentials.password2) {
            alert("Password did not match!");
            return;
        }

        try {
            let responce = account.create(
                ID.unique(),
                credentials.email,
                credentials.password,
                credentials.name    
            );
            console.log("User registered!", responce);

            await account.createEmailPasswordSession(
                credentials.email,
                credentials.password1
            );

            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/")
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
        <AuthProvider.Provider value = {contextData}>
            {loading ? <p>Loding...</p> : childern }
        </AuthProvider.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;