import { Link } from "gatsby";
import React from "react";

const Header = ({ siteTitle }) => (
  <header className="mb-6 bg-purple-700">
    <div className="container px-4 py-6 mx-auto my-0">
      <h1 className="m-0 font-display">
        <Link to="/" className="text-gray-200 no-underline">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

export default Header;
