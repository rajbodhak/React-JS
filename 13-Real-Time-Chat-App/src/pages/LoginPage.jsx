import React, { useEffect, useState } from "react";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const { user, handleUserLogin } = useAuth();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setCredentials({ ...credentials, [name]: value });
        console.log("CREDS: ", credentials);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[600px] p-8 bg-[rgba(27,27,39,1)] rounded-lg">
                <form onSubmit={(e) => handleUserLogin(e, credentials)}>
                    <div className="flex flex-col gap-4 py-2">
                        <label className="text-white">Email:</label>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={credentials.email}
                            onChange={(e) => handleInput(e)}
                            className="bg-[rgba(20,20,31,1)] border-b border-[rgba(40,41,57,1)] p-4 rounded-md text-white outline-none text-lg"
                        />
                    </div>
                    <div className="flex flex-col gap-4 py-2">
                        <label className="text-white">Password:</label>
                        <input
                            required
                            type="password"
                            name="password"
                            placeholder="Enter password..."
                            value={credentials.password}
                            onChange={(e) => handleInput(e)}
                            className="bg-[rgba(20,20,31,1)] border-b border-[rgba(40,41,57,1)] p-4 rounded-md text-white outline-none text-lg"
                        />
                    </div>
                    <div className="py-2">
                        <input
                            type="submit"
                            value="Login"
                            className="bg-[rgba(219,26,90,1)] text-white p-4 rounded-md cursor-pointer transition duration-300 hover:opacity-70"
                        />
                    </div>
                </form>
                <p className="text-white">
                    Don't have an account? Register{" "}
                    <Link to="/register" className="text-[#40e0d0]">
                        here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
