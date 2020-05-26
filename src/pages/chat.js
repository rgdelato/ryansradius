import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { parse as parseQueryString } from "query-string";
import { gql, useQuery } from "@apollo/client";
import { getProfile, isAuthenticated } from "../utils/auth";
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
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-2xl">{error.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      <div
        className="min-h-screen flex overflow-hidden bg-gray-100"
        style={{ minHeight: "-webkit-fill-available" }}
      >
        <Sidebar
          user={user}
          channels={data && data.channel}
          selectedChannel={selectedChannel}
          loading={loading}
          isOpen={sidebarIsOpen}
          onCloseSidebar={handleCloseSidebar}
        />

        <div className="max-h-screen flex flex-col w-0 flex-1 overflow-hidden">
          <ContentHeader
            channels={data && data.channel}
            loading={loading}
            selectedChannel={selectedChannel}
            onOpenSidebar={handleOpenSidebar}
          />

          <main className="flex flex-row flex-1 relative z-0 overflow-hidden focus:outline-none">
            <div className="flex flex-col flex-auto">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <Content
                    channels={data && data.channel}
                    selectedChannel={selectedChannel}
                  />

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
  );
}

function Loading() {
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="text-2xl">Loading...</div>
    </div>
  );
}
