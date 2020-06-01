import { useEffect } from "react";
import debounce from "lodash/debounce";
// import { useStaticQuery, graphql } from "gatsby";

// import Header from "./header";
import "typeface-inter";
// import "typeface-open-sans";
// import "typeface-merriweather";
import "./layout.css";

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  useEffect(() => {
    const mobile100vhHack = debounce(() => {
      document.documentElement.style.setProperty(
        "--vh100",
        `${window.innerHeight}px`
      );
    }, 75);

    mobile100vhHack();

    window.addEventListener("resize", mobile100vhHack);

    return () => {
      window.removeEventListener("resize", mobile100vhHack);
    };
  }, []);

  return children;

  // return (
  //   <>
  //     <Header siteTitle={data.site.siteMetadata.title} />
  //     <div className="container px-4 pb-6 mx-auto my-0">
  //       <main className="text-gray-800 font-body">{children}</main>
  //       <footer className="container mx-auto mt-6 font-display">
  //         © {new Date().getFullYear()}, Built with
  //         {` `}
  //         <a href="https://www.gatsbyjs.org">Gatsby</a>
  //       </footer>
  //     </div>
  //   </>
  // );
};

export default Layout;
