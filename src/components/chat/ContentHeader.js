import React from "react";

export default function ContentHeader({ selectedChannel, onOpenSidebar }) {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 sm:hidden"
        aria-label="Open sidebar"
        onClick={onOpenSidebar}
      >
        <svg
          className="h-6 w-6"
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
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <div className="w-full flex sm:ml-0">
            <div className="relative w-full text-sm text-gray-400 truncate focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                {selectedChannel && selectedChannel.topic ? (
                  <>
                    <span className="hidden sm:inline">Topic:&nbsp;</span>
                    {selectedChannel.topic}
                  </>
                ) : null}
              </div>
              {/* <div className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm">
                ???
              </div> */}
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center sm:ml-6">
          <div className="text-sm leading-5 font-medium text-gray-500">
            {selectedChannel ? <>#{selectedChannel.name}</> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
