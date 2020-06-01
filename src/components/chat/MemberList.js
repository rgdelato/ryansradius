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
      <div className="flex-shrink-0 hidden w-48 px-2 pt-1 pb-3 text-sm text-gray-700 bg-gray-200 border-l shadow-inner lg:block sm:px-3 sm:px-4 sm:py-3"></div>
    );
  }

  return (
    <div className="flex-shrink-0 hidden w-48 px-2 pt-1 pb-3 text-sm text-gray-700 bg-gray-200 border-l shadow-inner lg:block sm:px-3 sm:px-4 sm:py-3">
      <div className="text-xs font-semibold leading-5 text-gray-400 uppercase">
        Online–0
      </div>

      {data.users.map(({ id, name }) => (
        <div key={id} className="flex items-center">
          <div className="flex-none w-2 h-2 text-gray-200 bg-gray-400 rounded-full shadow-solid"></div>
          <div className="flex-auto ml-2 truncate">{name}</div>
        </div>
      ))}
    </div>
  );
}
