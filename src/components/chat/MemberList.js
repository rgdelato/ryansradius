import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetChannels {
    users(order_by: { created_at: asc }) {
      id
      name
    }
  }
`;

export default function MemberList() {
  const { loading, error, data } = useQuery(GET_USERS);
  // console.log("GET_USERS", { loading, error, data });

  if (loading || !data || error) {
    return (
      <div className="flex-shrink-0 hidden lg:block w-48 border-l bg-gray-200 px-2 sm:px-3 sm:px-4 pt-1 pb-3 sm:py-3 text-sm text-gray-700 shadow-inner"></div>
    );
  }

  return (
    <div className="flex-shrink-0 hidden lg:block w-48 border-l bg-gray-200 px-2 sm:px-3 sm:px-4 pt-1 pb-3 sm:py-3 text-sm text-gray-700 shadow-inner">
      <div className="text-xs leading-5 text-gray-400 font-semibold uppercase">
        Online–0
      </div>

      {data.users.map((user) => (
        <div key={user.id} className="flex items-center">
          <div className="flex-none h-2 w-2 rounded-full text-gray-200 shadow-solid bg-gray-400"></div>
          <div className="flex-auto ml-2 truncate">{user.name}</div>
        </div>
      ))}
    </div>
  );
}
