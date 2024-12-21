import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import jonicon from "../../assets/jobs-logo.png";
const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("sign out successfull");
      })
      .catch((error) => {
        console.log("faild to sign out. stay here, dont leave me alone", error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/myapplications">My Applicatons</NavLink>
      </li>
      <li>
        <NavLink to="/addjob">Add Job</NavLink>
      </li>
      <li>
        <NavLink to="/myPostedJobs">My Posted Jobs</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="text-xl flex items-center gap-3">
          <img src={jonicon} alt="" className="w-12" />
          <h3 className="text-xl text-white uppercase font-bold">Job Portal</h3>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">{links}</ul>
      </div>
      <div className="navbar-end gap-3">
        {user ? (
          <>
            <button onClick={handleSignOut} className="btn btn-neutral">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="btn btn-warning">
              Register
            </Link>
            <Link to="/signIn" className="btn btn-primary">
              SIgn in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
