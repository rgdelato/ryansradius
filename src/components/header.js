import { Link } from "gatsby";
import React from "react";

const Header = ({ siteTitle }) => (
  <header className="bg-purple-700 mb-6">
    <div className="container mx-auto my-0 px-4 py-6">
      <h1 className="m-0 font-display">
        <Link to="/" className="text-gray-200 no-underline">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

export default Header;
