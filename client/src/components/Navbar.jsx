import { Link } from "react-router-dom"

function Navbar({
  showLogin=true,
  showSignup=true,
  rightSlot,
  title="IdeaSpark"
}){
    return(
        <nav className="bg-gray-700 flex p-4 justify-between items-center sticky top-0">
      
      {/* LEFT */}
      <h1 className="font-bold text-white text-lg">
        <Link to="/">
        {title}
        </Link>
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-7">
        {rightSlot ? rightSlot :null}
        {showLogin ? (
          <Link to="/login" className="text-white hover:font-bold hover:cursor-pointer">
          Login
        </Link>
        ) : null}

        {showSignup ? (
        <button className="bg-amber-600 px-3 py-2 rounded hover:bg-amber-800 text-white transition hover:cursor-pointer">
          <Link to="/signup">
          Sign Up for Free
          </Link>
        </button>
        ): null}
      </div>

    </nav>
    )
}

export default Navbar