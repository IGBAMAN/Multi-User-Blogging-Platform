import parse from 'html-react-parser';
import React  from "react";
import {dbObj} from '../appwriteConfig/DB_read_write_service'
import {Link} from 'react-router-dom'


export default function PostCont({$id,title,content,coverImg}){  //names of columns given in db
     console.log(content)
    return(
        <div className="w-full">
            <Link to={`/post/${$id}`}>
            <div className="w-full h-auto bg-slate-900/40 backdrop-blur-md rounded-2xl p-4 border border-slate-800/60 shadow-lg hover:shadow-xl hover:border-slate-700/80 hover:-translate-y-1 transition-all duration-300 ease-out group transform-gpu">
                <div className="w-full justify-center mx-auto overflow-hidden rounded-xl bg-slate-950 mb-4 relative">
                   
                    <img src={dbObj.fileDownload(coverImg)} alt="not uploaded" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 ease-out" />

                </div>
                <h2 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-purple-400 transition-colors">{title}</h2>
                <h3 className="text-5xl text-white">{parse(content)}</h3>            
                

            </div>

            </Link>

        </div>
    )
}
