import React from "react";
import { Link } from "react-router-dom";

function OrderSuccessPage() {
  
  return (
    <div className="flex flex-col gap-2">
      <img
        src="./images/successful-purchase-animate.svg"
        alt=""
        className="md:w-1/2 mx-auto h-[90vh]"
      />
      <p className="text-slate-300 text-center px-1">Thank you for ordering!! you order has been placed</p>
      <Link to="/" className=" cursor-pointer underline mx-auto">Go back to home</Link>
    </div>
  );
}

export default OrderSuccessPage;
