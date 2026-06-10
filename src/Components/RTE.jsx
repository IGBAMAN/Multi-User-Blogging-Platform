import React from "react";
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
// Real time editor as a component using contoller  


//useforward ref can also be used to send refernce instead of controll 
export default function Rte({name,label,control,defaultValue=''}){
    return(
        <div className="w-full mt-1.5 p-3 rounded-4xl"
        > {label && <label className="inline-block w-full text-blue-400">{label} </label>}
            
            
                <Controller
                    name={name || 'content'}  //name of the field
                    defaultValue={defaultValue}  //default value of the field
                    control={control}  //control passed on from parent who is tryin to access it
                    render={({field:{onChange,value}}) => (  
                        // render field  
                       
                    <Editor
                        apiKey="j2l99oto6wya6imtmdqkn98vhzjh3s89dmhfj2s1j4npq3s9"
                        value={value || ""}   //destructuring value from field and giving it to editor
                        init={{    
                        initialValue: {defaultValue}, // once initialised wont change even if default value changes as it is only for initialisation
                        
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={onChange}
                    />
                    )}
                    
                    
                />
            

            
        </div>

    )
}

