import React from "react";
// import { Link } from "gatsby";
import Layout from "../components/layout";
// import Image from "../components/image";
import SEO from "../components/seo";
import { login as handleLogin } from "../utils/auth";

const IndexPage = () => {
  return (
    <>
      <SEO title="Login" />

      <Layout>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="m-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-6 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
