
//gaurantees the passing of env var in string to avoid app crash
const config={
    appwriteEND:String(import.meta.env.VITE_appWrite_URL),
    dbLink:String(import.meta.env.VITE_appWrite_db_id),
    collection:String(import.meta.env.VITE_appWrite_coll_id),
    bucket:String(import.meta.env.VITE_appWrite_bucket_id),
    project:String(import.meta.env.VITE_appWrite_proj_id)

}

export default config