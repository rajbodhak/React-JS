import React, {useState} from "react";
import { useAuth } from "../services/AuthContext";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: ""})
    const {handleRegister} = useAuth()

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]: value})
        console.log("CREDS: ", credentials)
    }

    return (
        <div className="flex items-center justify-center h-screen">
          <div className="w-[600px] p-8 bg-[rgba(27,27,39,1)] rounded-lg">
            <form onSubmit={(e) => handleRegister(e, credentials)}>
              <div className="flex flex-col gap-4 py-2">
                <label className="text-white">Name:</label>
                <input 
                  required
                  type="text"
                  name="name"
                  placeholder="Enter your name..."
                  value={credentials.name}
                  onChange={(e) => handleInputChange(e)}
                  className="bg-[rgba(20,20,31,1)] border-b border-[rgba(40,41,57,1)] p-4 rounded-md text-white outline-none text-lg"
                />
              </div>
              <div className="flex flex-col gap-4 py-2">
                <label className="text-white">Email:</label>
                <input 
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={credentials.email}
                  onChange={(e) => handleInputChange(e)}
                  className="bg-[rgba(20,20,31,1)] border-b border-[rgba(40,41,57,1)] p-4 rounded-md text-white outline-none text-lg"
                />
              </div>
              <div className="flex flex-col gap-4 py-2">
                <label className="text-white">Password:</label>
                <input 
                  required
                  type="password"
                  name="password1"
                  placeholder="Enter a password..."
                  value={credentials.password1}
                  onChange={(e) => handleInputChange(e)}
                  className="bg-[rgba(20,20,31,1)] border-b border-[rgba(40,41,57,1)] p-4 rounded-md text-white outline-none text-lg"
                />
              </div>
              <div className="flex flex-col gap-4 py-2">
                <label className="text-white">Confirm password:</label>
                <input 
                  required
                  type="password"
                  name="password2"
                  placeholder="Confirm your password..."
                  value={credentials.password2}
                  onChange={(e) => handleInputChange(e)}
                  className="bg-[rgba(20,20,31,1)] border-b border-[rgba(40,41,57,1)] p-4 rounded-md text-white outline-none text-lg"
                />
              </div>
              <div className="py-2">
                <input 
                  type="submit"
                  value="Register"
                  className="bg-[rgba(219,26,90,1)] text-white p-4 rounded-md cursor-pointer transition duration-300 hover:opacity-70"
                />
              </div>
            </form>
            <p className="text-white">Already have an account? Login <Link to="/login" className="text-[#40e0d0]">here</Link></p>
          </div>
        </div>
      );
      
}

export default RegisterPage