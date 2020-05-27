import React, { useEffect, useRef } from "react";
import { gql, useSubscription } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import isSameDay from "date-fns/isSameDay";
import isSameMinute from "date-fns/isSameMinute";
import formatDate from "date-fns/format";

const MESSAGES_SUBSCRIPTION = gql`
  subscription MySubscription($_eq: uuid!) {
    messages(
      where: { channel_id: { _eq: $_eq } }
      order_by: { created_at: asc }
    ) {
      id
      message
      created_at
      updated_at
      user {
        id
        name
        picture
      }
    }
  }
`;

export default function Content({ selectedChannel }) {
  const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { _eq: selectedChannel.id },
  });

  // console.log("MESSAGES_SUBSCRIPTION", { data, loading });

  if (loading || !data) {
    return (
      <div className="absolute inset-0 overflow-scroll max-w-7xl pt-2 px-4 sm:px-8 flex justify-center items-center">
        <div className="text-xl text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <ChatScroller
      id="Content"
      className="absolute inset-0 overflow-scroll max-w-7xl pt-2 px-4 sm:px-8"
    >
      {/* Replace with your content */}
      <div className="py-4 space-y-2">
        <>
          {data.messages.map((message, i) => {
            const previousMessage = data.messages[i - 1];
            const firstOfTheDay =
              !previousMessage ||
              !isSameDay(
                new Date(previousMessage.created_at),
                new Date(message.created_at)
              );
            const postedThisYear = true;
            const firstOfTheMinute =
              !previousMessage ||
              !isSameMinute(
                new Date(previousMessage.created_at),
                new Date(message.created_at)
              );
            const isDifferentUser =
              !previousMessage || previousMessage.user.id !== message.user.id;

            return (
              <React.Fragment key={message.id}>
                {firstOfTheDay ? (
                  <div className="py-3">
                    <div className="relative border-t-2">
                      <div className="absolute inset-0 text-center">
                        <div className="inline-block transform -translate-y-1/2 p-2 text-xs leading-5 text-gray-400 font-semibold uppercase bg-gray-100">
                          {formatDate(
                            new Date(message.created_at),
                            postedThisYear ? "MMM d" : "MMM d, yyyy"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {firstOfTheMinute || isDifferentUser ? (
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="inline-block h-9 w-9 rounded-md bg-gray-200 shadow-inner"
                        src={message.user.picture}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs leading-5 font-medium text-gray-400">
                        {message.user.name} •{" "}
                        {formatDate(new Date(message.created_at), "h:mm a")}
                      </p>
                      <p className="text-sm leading-5 font-medium text-gray-900">
                        <ReactMarkdown
                          source={message.message}
                          linkTarget="_blank"
                          renderers={{
                            paragraph: (props) => <React.Fragment {...props} />,
                          }}
                        />
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="ml-12">
                      <p className="text-sm leading-5 font-medium text-gray-900">
                        <ReactMarkdown
                          source={message.message}
                          linkTarget="_blank"
                          renderers={{
                            paragraph: (props) => <React.Fragment {...props} />,
                          }}
                        />
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </>
      </div>
      {/* /End replace */}
    </ChatScroller>
  );
}

function ChatScroller(props) {
  const ref = useRef();
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const node = ref.current;
      node.scrollTop = node.scrollHeight;
    }
  });

  const handleScroll = () => {
    const node = ref.current;
    const { scrollTop, clientHeight, scrollHeight } = node;
    const atBottom = scrollHeight <= clientHeight + scrollTop + 48;
    shouldScrollRef.current = atBottom;
  };

  return <div {...props} ref={ref} onScroll={handleScroll} />;
}
