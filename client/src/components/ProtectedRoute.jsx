import {AuthContext, AuthProvider} from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'

const ProtectedRoute=({children})=>{
    const {isAuth,loading}=useContext(AuthContext);

    if(loading)
        return <p>Checking Authentication...</p>;

    if(!isAuth)
        return <Navigate to='/login' replace/>

    return children;
}

export default ProtectedRoute