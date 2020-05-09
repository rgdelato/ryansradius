import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import "typeface-open-sans";
import "typeface-merriweather";
import "./layout.css";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container mx-auto my-0 px-4 pb-6">
        <main className="font-body text-gray-800">{children}</main>
        <footer className="container mx-auto font-display mt-6">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

export default Layout;
