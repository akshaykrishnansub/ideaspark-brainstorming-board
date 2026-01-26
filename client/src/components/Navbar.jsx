function Navbar(){
    return(
        <nav className="bg-gray-700 flex px-6 py-3 justify-between items-center">
      
      {/* LEFT */}
      <h1 className="font-bold text-white text-lg">
        Ideaspark
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-7">
        <a href="#" className="text-white hover:font-bold">
          Login
        </a>

        <button className="bg-amber-600 px-3 py-2 rounded hover:bg-amber-800 text-white transition">
          Sign Up for Free
        </button>
      </div>

    </nav>
    )
}

export default Navbar