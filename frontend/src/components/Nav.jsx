import React from "react";
import { useSelector } from "react-redux";

function Nav() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return <div>{isAuthenticated ? <p>{user.name}</p> : <p>No user logged in </p>}</div>;
}

export default Nav;
