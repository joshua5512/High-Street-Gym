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
    <div className="flex flex-col items-center md:flex-row md:items-baseline">
      <a href="/" className="btn btn-ghost normal-case text-xl m-2" onClick={() => setShowMenu(false)}>
        High Street Gym
      </a>
      <div className="navbar flex-col md:justify-start space-x-reverse">
        <div className="burger-menu md:hidden relative" onClick={toggleMenu}>
          <FaBars />
        </div>
        <ul className={`menu md:menu-horizontal px-1 w-full  ${showMenu ? 'block' : 'hidden'}`}>
          {user && user.role === "admin" ? (
            <li>
              <Link to="/users">Users</Link>
            </li>
          ) : (
            <></>
          )}
          {user && (user.role === "admin" || user.role === "trainer") ? (
            <>
              <li>
                <Link to="/activities">Activities</Link>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
            </>
          ) : (
            <></>
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
          <li>
            <Link to="/dashboard">{userName} {}</Link>
          </li>
          <button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1jm41a9-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button"><img class="MuiBox-root css-1ap82d2" alt="profile" src="/static/media/profile.42c126d38ecd6a94419f.jpeg"><div class="MuiBox-root css-13brihr"><p class="MuiTypography-root MuiTypography-body1 css-aglvno-MuiTypography-root">Shelly</p><p class="MuiTypography-root MuiTypography-body1 css-1s0qfms-MuiTypography-root">Pharmacist</p></div><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1g60yf-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownOutlinedIcon"><path d="m7 10 5 5 5-5H7z"></path></svg><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>
          <li>
            <a onClick={onLogoutClick}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}


