import React from "react";
import { Link } from "react-router-dom";

function OrderSuccessPage() {
  return (
    <div>
      Order Place will get to you soon
      <Link to="/">Go back to home</Link>
    </div>
  );
}

export default OrderSuccessPage;
