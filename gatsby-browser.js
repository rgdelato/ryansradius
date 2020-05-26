/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { silentAuth } from "./src/utils/auth";

function SilentAuth({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    silentAuth().then((auth0) => {
      setLoading(false);

      auth0.isAuthenticated().then((res) => {
        if (res) {
          navigate("/chat");
        }
      });
    });
  }, []);

  return loading === false && <React.Fragment>{children}</React.Fragment>;
}

export const wrapRootElement = ({ element }) => {
  return <SilentAuth>{element}</SilentAuth>;
};
