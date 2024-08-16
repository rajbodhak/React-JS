import React from "react";

function Button({
    children,  
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'white',
    className = '',
    ...props
}) {

    return (
        <button type={type} className={`px-4 py-2 rounded-md ${bgColor} ${textColor} ${className} hover:bg-blue-600`} {...props}>
            {children} 
        </button>
    );
}

export default Button;
