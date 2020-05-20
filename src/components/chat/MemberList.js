import React from "react";

export default function MemberList() {
  return (
    <div className="flex-shrink-0 hidden md:block w-48 border-l bg-gray-200 px-2 sm:px-3 sm:px-4 pt-1 pb-3 sm:py-3 text-sm text-gray-700 shadow-inner">
      <div className="text-xs leading-5 text-gray-400 font-semibold uppercase">
        Online–2
      </div>
      <div className="flex items-center">
        <div className="flex-none h-2 w-2 rounded-full text-gray-200 shadow-solid bg-green-400"></div>
        <div className="flex-auto ml-2 truncate">Ryan De La Torre</div>
      </div>
      <div className="flex items-center">
        <div className="flex-none h-2 w-2 rounded-full text-gray-200 shadow-solid bg-green-400"></div>
        <div className="flex-auto ml-2 truncate">Ellen Giesy</div>
      </div>
    </div>
  );
}
