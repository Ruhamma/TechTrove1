import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Nav() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return <Link to="/profile">{isAuthenticated ? <p>{user.name}</p> : <p>No user logged in </p>}</Link>;
}

export default Nav;
