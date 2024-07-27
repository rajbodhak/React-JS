import React, {useContext} from "react";
import UserContext from "../Context/UserContext";

function Profile() {
    const {user} = useContext(UserContext)
    if(!user) return <div className="profile-text" id="warning">Please Login!</div>
    return <div className="profile-text">Welcome <span id="userName">{user.username}!</span></div>
}

export default Profile