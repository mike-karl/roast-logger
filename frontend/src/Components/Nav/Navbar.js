import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
function Navbar() {
  const [isSignupPage, setIsSignupPage] = React.useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();
  let location = useLocation();

  const signout = async () => {
    await logout();
    navigate("/login");
  };

  React.useEffect(() => {
    if (location.pathname === "/login") {
      setIsSignupPage(false);
    }
    if (location.pathname === "/signup") {
      setIsSignupPage(true);
    }
  }, [location]);

  return (
    <div className="navbar">
      {!auth?.accessToken ? (
        <>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>Mantra Coffee Roast Logger</h1>
          </Link>
          {isSignupPage ? (
            <button
              className="secondary-authBtn"
              onClick={() => navigate("/login")}
            >
              Login!
            </button>
          ) : (
            <button
              className="secondary-authBtn"
              onClick={() => navigate("/signup")}
            >
              Sign Up!
            </button>
          )}
        </>
      ) : (
        <>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>Mantra Coffee Roast Logger</h1>
          </Link>
          <Link to="/">
            <span>Home</span>
          </Link>
          <Link to="/mantraCoffee/add-roast-log">
            <span>Roast Logger</span>
          </Link>
          <button className="secondary-authBtn" onClick={signout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Navbar;
