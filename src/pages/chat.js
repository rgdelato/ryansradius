import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { parse as parseQueryString } from "query-string";
import { gql, useQuery } from "@apollo/client";
import { getProfile, isAuthenticated } from "../utils/auth";
import SEO from "../components/seo";
import Layout from "../components/layout";
import Sidebar from "../components/chat/Sidebar";
import ContentHeader from "../components/chat/ContentHeader";
import Content from "../components/chat/Content";
import ContentFooter from "../components/chat/ContentFooter";
import MemberList from "../components/chat/MemberList";

const GET_CHANNELS = gql`
  query GetChannels {
    channel {
      id
      name
      topic
    }
  }
`;

export default function ChatLayout(props) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarIsOpen(true);
  const handleCloseSidebar = () => setSidebarIsOpen(false);

  const [user, setUser] = useState();

  useEffect(() => {
    getProfile().then((user) => {
      setUser(user);
    });
  }, []);

  const { loading, error, data } = useQuery(GET_CHANNELS);
  // console.log("GET_CHANNELS", { loading, error, data });

  const { channel = null } = parseQueryString(
    props.location && props.location.search
  );

  const selectedChannel =
    channel && data
      ? data.channel.find((item) => item.name === channel) || data.channel[0]
      : data
      ? data.channel[0]
      : null;

  useEffect(() => {
    isAuthenticated().then((res) => {
      if (!res) {
        navigate("/");
      }
    });
  }, []);

  if (!user) {
    return <Loading />;
  }

  if (error) {
    return <Loading message={error ? error.message : "Error"} />;
  }

  return (
    <>
      <SEO
        title={`#${selectedChannel ? selectedChannel.name : "...loading..."}`}
      />

      <Layout>
        <div className="flex flex-1 bg-gray-100">
          <Sidebar
            user={user}
            channels={data && data.channel}
            selectedChannel={selectedChannel}
            loading={loading}
            isOpen={sidebarIsOpen}
            onCloseSidebar={handleCloseSidebar}
          />

          <div className="flex flex-col flex-1">
            <ContentHeader
              channels={data && data.channel}
              loading={loading}
              selectedChannel={selectedChannel}
              onOpenSidebar={handleOpenSidebar}
            />

            <main className="flex flex-row flex-1 z-0 focus:outline-none">
              <div className="flex flex-col flex-auto">
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <div className="relative flex-1">
                      <Content
                        channels={data && data.channel}
                        selectedChannel={selectedChannel}
                      />
                    </div>

                    <ContentFooter
                      user={user}
                      selectedChannel={selectedChannel}
                    />
                  </>
                )}
              </div>

              <MemberList />
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
}

function Loading({ message }) {
  return (
    <Layout>
      <div className="flex-1 flex justify-center items-center">
        <div className="text-xl text-gray-400">
          {message ? message : "Loading..."}
        </div>
      </div>
    </Layout>
  );
}
