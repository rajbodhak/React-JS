import React from "react";

function Button({
    childern,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'white',
    className = '',
    ...props
}) {

    return (
        <button className={`px-4 py-2 rounded-md ${bgColor} ${textColor} ${className}`} {...props}>{childern}</button>
    )
}


export default Button;