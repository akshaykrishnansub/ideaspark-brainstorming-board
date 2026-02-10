import { createContext,useEffect,useState} from "react";

//create a context
const AuthContext=createContext();


//
const AuthProvider=({children})=>{
    const [loading,setLoading]=useState(true);
    const [isAuth,setIsAuth]=useState(false);

    useEffect(()=>{
        fetch('http://localhost:5000/api/me',{
            credentials:"include"
        })
        .then(res=>{
            if(res.ok)
                setIsAuth(true);
            else setIsAuth(false);
        })
        .finally(()=>setLoading(false));
    },[]);

    return(
        //provide the context value
        <AuthContext.Provider value={{isAuth,setIsAuth,loading}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext,AuthProvider}
