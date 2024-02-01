import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [isUserLoggedin, setIsUserLoggedin] = useState(localStorage.getItem("userName"));
  const navigator = useNavigate();

  useEffect(() => {
    setIsUserLoggedin(localStorage.getItem("userName"));

    const handleLoginEvent = () => {
      console.log("User logged in");
      setIsUserLoggedin(localStorage.getItem("userName"));
    };

    window.addEventListener("userLoggedIn", handleLoginEvent);

    return () => {
      window.removeEventListener("userLoggedIn", handleLoginEvent);
    };
  }, []);

  const handleLogout = async () => {
    await localStorage.removeItem("userName");
    navigator("/");
    setIsUserLoggedin(null);
  };

  return (
    <div className="w-full flex flex-col md:flex-col justify-center text-white items-center md:items-center md:py-4">
      <h1 className="text-4xl font-semibold italic">
        todotask<span className="text-3xl font-semibold text-cyan-300">.io</span>
      </h1>
      <div className="w-1/6 border opacity-20 bg-cyan-300 my-3 md:hidden"></div>
      <div className="w-full md:w-1/6 flex justify-evenly my-3">
        {isUserLoggedin ? (
          <>
            <button onClick={handleLogout} className="text-cyan-300">
              Logout
            </button>{" "}
            |{" "}
            <NavLink to={"/addTodo"} className={({ isActive }) => isActive ? "text-cyan-300" : "default"}>
              AddTodo
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={"/"} className={({ isActive }) => isActive ? "text-cyan-300" : "default"}>
              Login
            </NavLink>{" "}
            |{" "}
            <NavLink to={"/register"} className={({ isActive }) => isActive ? "text-cyan-300" : "default"}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
