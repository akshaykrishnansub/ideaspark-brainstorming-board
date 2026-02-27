import { Link } from "react-router-dom"
import Avatar from "./Avatar.jsx"

function Navbar({
  leftSlot,
  showLogin=true,
  showSignup=true,
  profile, //profile name object containing email or name
  rightSlot,
  title="IdeaSpark"
}){
    return(
      <nav className="fixed bg-gray-700 flex p-4 justify-between items-center sm:sticky top-0 w-full left-0 h-16">

      {/* LEFT */}
      <h1 className="font-bold text-white text-lg">
        <Link to="/">
        {title}
        </Link>
      </h1>
      <div className="md:hidden gap-4 mr-auto">
          {leftSlot}
        </div>
      {/* RIGHT */}
      <div className="flex items-center gap-7">
        {rightSlot ? rightSlot :null}
        {profile && profile.username && (
        <Avatar username={profile.username} size={40}/>
        )}
        {!profile && showLogin && (
          <Link to="/login" className="text-white hover:font-bold hover:cursor-pointer">
          Login
        </Link>
        )}
        {!profile && showSignup && (
        <button className="bg-amber-600 px-3 py-2 rounded hover:bg-amber-800 text-white transition hover:cursor-pointer">
          <Link to="/register">
          Sign Up for Free
          </Link>
        </button>
        )}
      </div>

    </nav>
    )
}

export default Navbar