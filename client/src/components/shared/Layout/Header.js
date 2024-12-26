import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the display name based on the role
  const getDisplayName = () => {
    if (!user) return "Guest"; // Default for non-logged-in users
    switch (user.role) {
      case "admin":
        return user.name;
      case "organisation":
        return user.organisationName;
      case "hospital":
        return user.hospitalName;
      case "donor":
        return user.name;
      default:
        return "User";
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successful");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar ">
        <div className="container-fluid">
          <div className="navbar-brand h1">
            <BiDonateBlood color="red" /> Blood Bank App
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle /> Welcome {getDisplayName()}!
              </p>
            </li>

            {/* Conditional rendering for Home/Analytics */}
            {user?.role !== "donor" ? (
              <>
                {location.pathname === "/" ||
                location.pathname === "/donar" ||
                location.pathname === "/hospital" ? (
                  <li className="nav-item mx-3">
                    <Link to="/analytics" className="nav-link">
                      Analytics
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item mx-3">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                )}
              </>
            ) : null}

            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
