function Navbar({
  showLogin=true,
  showSignup=true,
  rightSlot,
  title="IdeaSpark"
}){
    return(
        <nav className="bg-gray-700 flex px-6 py-3 justify-between items-center">
      
      {/* LEFT */}
      <h1 className="font-bold text-white text-lg">
        {title}
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-7">
        {rightSlot ? rightSlot :null}
        {showLogin ? (
          <a href="#" className="text-white hover:font-bold">
          Login
        </a>
        ) : null}

        {showSignup ? (
        <button className="bg-amber-600 px-3 py-2 rounded hover:bg-amber-800 text-white transition">
          Sign Up for Free
        </button>
        ): null}
      </div>

    </nav>
    )
}

export default Navbar