import React from "react";
import { useAuth } from "../services/AuthContext";
import { Link } from "react-router-dom";
import {LogOut, LogIn} from "react-feather"

const Header = () => {
    const {user, handleLogout} = useAuth()

    return (
        <div className="bg-[rgba(20,20,31,1)] p-4 flex justify-between rounded-t-lg border border-[rgba(40,41,57,1)] border-b-0">
          {user ? (
            <>
              <span className="text-white">Welcome {user.name}</span>
              <LogOut className="text-[#c7d8eb] cursor-pointer transition duration-300 hover:text-[#8db3dd]" onClick={handleLogout} />
            </>
          ) : (
            <>
              <Link to="/">
                <LogIn className="text-[#c7d8eb] cursor-pointer transition duration-300 hover:text-[#8db3dd]" />
              </Link>
            </>
          )}
        </div>
    );      
}

export default Header