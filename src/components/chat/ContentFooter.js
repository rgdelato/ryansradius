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
  const inputRef = useRef(null);
  const [addMessage /* , { data } */] = useMutation(ADD_MESSAGE);

  const handleSubmit = (e) => {
    const messageText = inputRef?.current?.value;

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
    <div className="flex-initial bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="flex p-3 rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <ChatSVG className="w-5 h-5 text-gray-400" fill="currentColor" />
            </div>
            <input
              ref={inputRef}
              className="block w-full pl-10 transition duration-150 ease-in-out rounded-none form-input rounded-l-md sm:text-sm sm:leading-5"
              placeholder={`Message #${selectedChannel.name}`}
            />
          </div>
          <button className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-r-md bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}
