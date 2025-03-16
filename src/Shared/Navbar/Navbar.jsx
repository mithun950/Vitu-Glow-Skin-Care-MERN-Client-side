import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // React icon for shopping cart

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();  // Get current route location to determine active link
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="text-white w-full mx-auto fixed top-0 left-0 right-0 z-10 backdrop-blur-md py-4">
      <div className="navbar w-11/12 mx-auto">
        <div className=" flex-1 flex items-center gap-2">
          {/* Logo */}
          <img className="w-30 px-6 bg-white rounded-3xl" src="https://images.squarespace-cdn.com/content/v1/66ca8e1e36ab2e3cfbd919eb/0d0e3ed9-ef2c-4cbb-828f-341c6d1248cd/Copy+of+Copy+of+VitaGlow+%28500+x+500+px%29+%28120+x+100+px%29+%28120+x+100+px%29+%28Logo%29-2.png" alt="Logo" />
          
        </div>

        <div className=" flex-none flex items-center gap-4">
          {/* Hamburger Menu for small devices */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Menu Items for large screens */}
          <div className={`hidden lg:flex gap-4`}>
            <Link to="/" className={`btn btn-ghost ${location.pathname === '/' ? 'underline' : ''}`}>Home</Link>
            <Link to="/products" className={`btn btn-ghost ${location.pathname === '/products' ? 'underline' : ''}`}>Products</Link>
            
            {/* Conditionally Render Links Based on User Authentication */}
            {!user ? (
              <>
                <Link to="/login" className="btn btn-ghost">Login</Link>
                <Link to="/signup" className="btn btn-ghost">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/cart" className="btn btn-ghost">
                  <FaShoppingCart className="text-xl" />
                </Link>
                {/* User profile */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img alt="Profile" src={user?.photoURL || "https://www.w3schools.com/w3images/avatar2.png"} />
                    </div>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content bg-purple-300 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><a onClick={logOut}>Logout</a></li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hamburger menu items) */}
      <div className={`lg:hidden ${isMenuOpen ? 'block absolute right-10 top-16 w-48 backdrop-blur-md bg-white/30  p-4 rounded-lg shadow-lg z-20' : 'hidden'}`}>
        <Link to="/" className={`block ${location.pathname === '/' ? 'underline' : ''}`}>Home</Link>
        <Link to="/products" className={`block ${location.pathname === '/products' ? 'underline' : ''}`}>Products</Link>
        
        {/* Conditionally Render Links Based on User Authentication */}
        {!user ? (
          <>
            <Link to="/login" className="block">Login</Link>
            <Link to="/signup" className="block">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/cart" className="block">
              <FaShoppingCart className="text-xl" />
            </Link>
            <div>
              <Link to="/dashboard" className="block">Dashboard</Link>
              <a onClick={logOut} className="block">Logout</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
