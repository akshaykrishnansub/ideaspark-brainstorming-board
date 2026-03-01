import { createContext,useEffect,useState} from "react";

//create a context
const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [loading,setLoading]=useState(true);
    const [isAuth,setIsAuth]=useState(false);
    const [profile,setProfile]=useState(null);

    const getProfile=async()=>{
        setLoading(true);
        try{
            const res=await fetch(`${import.meta.env.VITE_API_URL}/api/me`,{
            credentials:"include"
        })
        if(!res.ok)
            throw new Error('Not Authenticated');
        const data=await res.json();
        setProfile(data.user);
        setIsAuth(true);
        }catch(err){
            setProfile(null);
            setIsAuth(false);
        }
        finally{
            setLoading(false);
        };
    }

    useEffect(()=>{
        getProfile();
    },[]);

    const logout=async()=>{
        await fetch(`${import.meta.env.VITE_API_URL}/api/logout`,{
            method:'POST',
            credentials:'include'
        });
        setIsAuth(false);
        setProfile(null);
    }


    return(
        //provide the context value
        <AuthContext.Provider value={{isAuth,logout,setIsAuth,loading,profile,setProfile}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext,AuthProvider}
