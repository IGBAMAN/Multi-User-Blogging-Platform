import React, { useId } from "react";
import { forwardRef } from "react";
export const Select=React.forwardRef(function SelectOpt(
   { label,
    options,
    className='',
    ...props}
,ref){
    const id=useId();  
    return(
        <div className="w-full">
            
            <label htmlFor={id}
            className="text-amber-50 "
            >
                {label}


            </label>
            

            <select name="opt" id={id}
            {...props} className={`px-3 py-2 rounded-lg mb-1.5 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            >
                
                {options?.map((item)=>
                <option key={item} value={item}>
                    {item}
                </option>
                )}


            </select>


        </div>
    )
})