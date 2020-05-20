import React from "react";
import { handleAuthentication } from "../utils/auth";

const Callback = () => {
  handleAuthentication();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="text-2xl">Loading...</div>
    </div>
  );
};

export default Callback;
