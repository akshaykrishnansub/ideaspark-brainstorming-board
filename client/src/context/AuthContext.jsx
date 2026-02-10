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

    const logout=async()=>{
        await fetch('http://localhost:5000/api/logout',{
            method:'POST',
            credentials:'include'
        });
        setIsAuth(false);
    }


    return(
        //provide the context value
        <AuthContext.Provider value={{isAuth,logout,setIsAuth,loading}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext,AuthProvider}
