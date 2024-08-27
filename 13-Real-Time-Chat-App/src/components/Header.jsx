import React from "react";
import { useAuth } from "../services/AuthContext";
import { Link } from "react-router-dom";
import { List, LogIn } from "react-feather";

const Header = () => {
    const { user } = useAuth();

    return (
        <div className="bg-[rgba(20,20,31,1)] p-4 flex justify-between rounded-t-lg border border-[rgba(40,41,57,1)] border-b-0">
            <div className="flex items-center gap-4">
                
                {user ? (
                    <span className="text-white">
                        Welcome <span className="text-[rgba(219,26,90,1)] font-bold">{user.name}</span>
                    </span>
                ) : (
                    <Link to="/">
                        <LogIn className="text-[#c7d8eb] cursor-pointer transition duration-300 hover:text-[#8db3dd]" />
                    </Link>
                )}
            </div>

            {user && (
              <Link to="/">
                <List className="text-[#c7d8eb] cursor-pointer transition duration-300 hover:text-[#8db3dd]"/>
              </Link>  
            )}
        </div>
    );
};

export default Header;
