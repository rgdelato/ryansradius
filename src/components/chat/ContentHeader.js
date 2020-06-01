import React from "react";

export default function ContentHeader({ selectedChannel, onOpenSidebar }) {
  return (
    <div className="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
      <button
        className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:bg-gray-100 focus:text-gray-600 sm:hidden"
        aria-label="Open sidebar"
        onClick={onOpenSidebar}
      >
        <svg
          className="w-6 h-6"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className="flex justify-between flex-1 px-4">
        <div className="flex flex-1">
          <div className="flex w-full sm:ml-0">
            <div className="relative w-full text-sm text-gray-400 truncate focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                {selectedChannel && selectedChannel.topic ? (
                  <>
                    <span className="hidden sm:inline">Topic:&nbsp;</span>
                    {selectedChannel.topic}
                  </>
                ) : null}
              </div>
              {/* <div className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:placeholder-gray-400 sm:text-sm">
                ???
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-center ml-4 sm:ml-6">
          <div className="text-sm font-medium leading-5 text-gray-500">
            {selectedChannel ? <>#{selectedChannel.name}</> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
