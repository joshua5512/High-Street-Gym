import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import {userinitial} from "adi-userinitials"

export default function Nav() {
  const [user, login, logout] = useAuthentication();
  const navigate = useNavigate();

  // Define logout procedure
  function onLogoutClick(e) {
    logout();
    navigate("/");
  }

  // Determine the name of the user to display in the nav bar
  const userName = user ? user.firstname + " " + user.lastname : "User";

  const [showMenu, setShowMenu] = useState(false);

  // Toggle the burger menu
  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  // Set the initial value of showMenu based on screen size
  useEffect(() => {
    if (window.innerWidth >= 480) {
      setShowMenu(true);
    }
  }, []);

  return (
    <div className="md:flex">
      <div className={`h-screen w-64 fixed bg-gray-800 ${showMenu ? 'block' : 'hidden'} md:block`}>
        <a href="/" className="btn btn-ghost normal-case text-xl m-2 text-white" onClick={() => setShowMenu(false)}>
          High Street Gym
        </a>
        <div className="mt-5 px-4 flex justify-between">
          <ul>
            {user && user.role === "admin" && (
              <li className="mt-3">
                <Link to="/users" className="text-white">Users</Link>
              </li>
            )}
            {user && (user.role === "admin" || user.role === "trainer") && (
              <>
                <li className="mt-3">
                  <Link to="/activities" className="text-white">Activities</Link>
                </li>
                <li className="mt-3">
                  <Link to="/rooms" className="text-white">Rooms</Link>
                </li>
              </>
            )}
            <li className="mt-3">
              <Link to="/classes" className="text-white">Classes</Link>
            </li>
            <li className="mt-3">
              <Link to="/bookings" className="text-white">Bookings</Link>
            </li>
            <li className="mt-3">
              <Link to="/blogposts" className="text-white">Blogposts</Link>
            </li>
          </ul>
          <ul>
            <li className="mt-3">
              <Link to="/dashboard" className="text-white">{userName}</Link>
            </li>
            <li className="mt-3">
              <a onClick={onLogoutClick} className="text-white cursor-pointer">Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="md:w-3/4 ml-64">
        <div className="burger-menu md:hidden absolute right-0 mr-3 mt-3" onClick={toggleMenu}>
          <FaBars className="text-2xl text-gray-800" />
        </div>
        {/* Add the rest of your page content here */}
      </div>
    </div>
  );
}
