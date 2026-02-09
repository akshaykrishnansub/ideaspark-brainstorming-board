import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { useState } from "react"

function Login(){
    const [formData,setFormData]=useState({
        username:"",
        password:""
    })

    const [error,setError]=useState("")

    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(formData.username===""||formData.password===""){
            setError("All fields required")
            return;
        }
    }

    return (
        <>
        <title>IdeaSpark Login</title>
        <Navbar showLogin={false} showSignup={false} />
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-2">
            <form onSubmit={handleSubmit}>
                <div className="bg-white p-8 w-full max-w-md shadow-lg rounded-lg">
                <h1 className="text-center font-bold mb-4 text-2xl">Login to Access IdeaSpark</h1>
                <label htmlFor="email" className="font-medium">Username/Email</label>
                <input type="email" 
                className="w-full p-2 mt-4 border rounded mb-4"
                name="username"
                placeholder="Enter your email"
                value={formData.username}
                onChange={handleChange}
                required
                />
                <div>
                    <label htmlFor="password" className="font-medium mt-4">Password</label>
                    <input type="password" 
                    className="w-full p-2 mt-4 border rounded"
                    name="password"
                    placeholder="Enter the password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <button type="submit" className="w-full bg-amber-600 p-2 mt-4 text-white rounded hover:bg-amber-700 cursor-pointer transition">Login</button>
                </div>
                <p className="text-center p-2 text-sm">Dont have an account yet?{" "}<Link to="/register" className="hover:text-amber-600">Signup</Link></p>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login