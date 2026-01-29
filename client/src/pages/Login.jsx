import Navbar from "../components/Navbar"

function Login(){
    return (
        <>
        <Navbar showLogin={false} showSignup={false} />
        <p>Welcome to Login</p>
        </>
    )
}

export default Login