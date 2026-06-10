import React, { useId } from "react";
import { forwardRef } from "react";

//using  forward ref to access the states inside this component acc to whatever page it will be used in 
export const Input =React.forwardRef( function Input(
    {
    label,
    type='text',
    className='',
    ...props
    }
,ref){
    const id=useId();
    return(
        
        <div className="w-full">
            
                <label
                    htmlFor={id}
                    className='inline-block text-purple-600 mb-1 pl-1' 
                >

                {label}
                </label>
            
            <input type={type} 
                {...props}
                id={id}
                className={`${className} rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here...`}
                ref={ref}
            
            />
        </div>
       
    )

})