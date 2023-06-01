// import { Link, useNavigate } from "react-router-dom"
// import { useAuthentication } from "../hooks/authentication"

// export default function Nav() {
//     const [user, login, logout] = useAuthentication()
//     const navigate = useNavigate()

//     // Define logout procedure
//     function onLogoutClick(e) {
//         logout()
//         navigate("/")
//     }

//     // Determine the name of the user to display in the nav bar
//     const userName = user ? user.firstname + " " + user.lastname : "User"

//     return <div className="flex flex-col items-center md:flex-row md:items-baseline">
//         <a href ="/" className="btn btn-ghost normal-case text-xl m-2">High Street Gym</a>
//         <div className="navbar flex md:justify-start">
//             <ul className="menu md:menu-horizontal px-1 w-full">
//                 {
//                     user && user.role == "admin"
//                         ? <li><Link to="/users">Users</Link></li>
//                         : <></>
//                 }
//                 {
//                     user && (user.role == "admin" || user.role == "trainer")
//                         ? <>
//                             <li><Link to="/activities">Activities</Link></li>
//                             <li><Link to="/rooms">Rooms</Link></li>
//                         </>
//                         : <></>
//                 }
//                 <li><Link to="/classes">Classes</Link></li>
//                 <li><Link to="/bookings">Bookings</Link></li>
//                 <li><Link to="/blogposts">Blogposts</Link></li>
//                 <li><Link to="/dashboard">{userName}</Link></li>
//                 <li><a onClick={onLogoutClick}>Logout</a></li>
                
//             </ul>
//         </div>
//     </div>
// }

import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";

// Function to get initials
function getInitials(name) {
  let initials = name.split(' ').map(word => word[0]).join('');
  return initials.toUpperCase();
}

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
  const userInitials = user ? getInitials(userName) : "U";

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
    <div className="flex flex-col items-center md:flex-row md:items-baseline bg-blue-400 text-white">
      <a href="/" className="btn btn-ghost normal-case text-xl m-2 text-white" onClick={() => setShowMenu(false)}>
        High Street Gym
      </a>
      <div className="navbar flex-col md:flex-row md:justify-between w-full">
        <div className="burger-menu md:hidden relative text-white" onClick={toggleMenu}>
          <FaBars />
        </div>
        <ul className={`menu md:menu-horizontal px-1 w-full  ${showMenu ? 'block' : 'hidden'} md:flex-grow md:flex md:justify-start`}>
          {user && user.role === "admin" && (
            <li>
              <Link to="/users">Users</Link>
            </li>
          )}
          {user && (user.role === "admin" || user.role === "trainer") && (
            <>
              <li>
                <Link to="/activities">Activities</Link>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/classes">Classes</Link>
          </li>
          <li>
            <Link to="/bookings">Bookings</Link>
          </li>
          <li>
            <Link to="/blogposts">Blogposts</Link>
          </li>
        </ul>
        <ul className={`menu md:menu-horizontal px-1 w-full  ${showMenu ? 'block' : 'hidden'} md:flex md:justify-end`}>
          <li>
            <div className="icon bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 mt-2">{userInitials}</div>
            <Link to="/dashboard">{userName}</Link>
          </li>
          <li>
            <a onClick={onLogoutClick}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}


