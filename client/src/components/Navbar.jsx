import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className="bg-(--secondary) text-(--primary-text) p-3 flex justify-between">
        <div className="cursor-pointer text-2xl">cravings</div>

        <div className="flex gap-4 float-end hover:text-(--accent)">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>

          <Link to={"/login"} className="hover:underline ">
            Login
          </Link>

          <Link to={"/register"} className="hover:underline">
            Register
          </Link>

          <Link to={"/contactUs"} className="hover:underline">
            ContactUs
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
