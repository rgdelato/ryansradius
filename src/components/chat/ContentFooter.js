import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import ChatSVG from "../../svg/Chat";

const ADD_MESSAGE = gql`
  mutation AddMessage(
    $user_id: String!
    $message: String!
    $channel_id: uuid!
  ) {
    insert_messages_one(
      object: { message: $message, user_id: $user_id, channel_id: $channel_id }
    ) {
      id
      message
      user_id
      channel_id
      created_at
      updated_at
    }
  }
`;

export default function ContentFooter({ user, selectedChannel }) {
  const inputRef = useRef();
  const [addMessage /* , { data } */] = useMutation(ADD_MESSAGE);

  const handleSubmit = (e) => {
    const messageText = inputRef.current.value;

    e.preventDefault();

    if (messageText) {
      addMessage({
        variables: {
          user_id: user.sub,
          message: messageText,
          channel_id: selectedChannel.id,
        },
      });

      e.target.reset();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="p-3 flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ChatSVG className="h-5 w-5 text-gray-400" fill="currentColor" />
            </div>
            <input
              ref={inputRef}
              className="form-input block w-full rounded-none rounded-l-md pl-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              placeholder="Message #general"
            />
          </div>
          <button className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}
