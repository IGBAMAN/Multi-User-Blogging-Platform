import React from "react";

export default function Button({
    children,
    type='button',
    bg='blue',
    text='text-white',
    className='',       
    // setting up defaults
    ...props   


}){
    return(
        <button
            type={type}
            className={`${className} ${text} ${bg} rounded-xl px-4 py-2 shadow-sm transition-all duration-200 hover:opacity-90`}
            {...props} // All onClick, type, etc. now land on the actual button
        >
            {children}
        </button>
    )
}