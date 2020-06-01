import React from "react";
import { Link } from "gatsby";
import { logout } from "../../utils/auth";
import Transition from "../../utils/Transition";
import HashtagSVG from "../../svg/Hashtag";

export default function Sidebar({
  user,
  channels,
  selectedChannel,
  loading,
  isOpen,
  onCloseSidebar,
}) {
  return (
    <>
      {/* Off-canvas menu for mobile */}
      <Transition show={isOpen}>
        <div className="sm:hidden">
          <div className="fixed inset-0 z-40 flex">
            {/*
              Off-canvas menu overlay, show/hide based on off-canvas menu state.

              Entering: "transition-opacity ease-linear duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "transition-opacity ease-linear duration-300"
                From: "opacity-100"
                To: "opacity-0"
            */}
            <Transition
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
              </div>
            </Transition>
            {/*
              Off-canvas menu, show/hide based on off-canvas menu state.

              Entering: "transition ease-in-out duration-300 transform"
                From: "-translate-x-full"
                To: "translate-x-0"
              Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "-translate-x-full"
            */}
            <Transition
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex flex-col flex-1 w-full max-w-xs bg-gray-800">
                <div className="absolute top-0 right-0 p-1 -mr-14">
                  <button
                    className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600"
                    aria-label="Close sidebar"
                    onClick={onCloseSidebar}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-shrink-0 p-4 bg-gray-700">
                  <div className="flex-shrink-0 block group">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          className="inline-block w-10 h-10 bg-gray-200 rounded-md shadow-inner"
                          src={user.picture}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium leading-6 text-white">
                          {user.name}
                        </p>
                        <p className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">
                          <button onClick={logout}>Sign out</button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <nav className="px-2 mb-5">
                    {loading ? null : (
                      <>
                        {channels.map((channel, i) => (
                          <Link
                            key={channel.id}
                            to={`/chat?channel=${channel.name}`}
                            className={`${
                              i === 0 ? "" : "mt-1"
                            } group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 ${
                              channel.id === selectedChannel.id
                                ? "text-white bg-gray-900"
                                : "text-gray-300 hover:text-white hover:bg-gray-700 focus:text-white"
                            }`}
                            onClick={onCloseSidebar}
                          >
                            <HashtagSVG
                              className={`mr-4 h-6 w-6 ${
                                channel.name === "general"
                                  ? "text-gray-300"
                                  : "text-gray-400"
                              } group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150`}
                              stroke="none"
                              fill="currentColor"
                            />
                            {channel.name}
                          </Link>
                        ))}
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </Transition>

            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </div>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden sm:flex sm:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gray-800">
          <div className="flex flex-shrink-0 p-4 bg-gray-700">
            <div className="flex-shrink-0 block w-full group">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    className="inline-block bg-gray-200 rounded-md shadow-inner h-9 w-9"
                    src={user.picture}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium leading-5 text-white">
                    {user.name}
                  </p>
                  <p className="text-xs font-medium leading-4 text-gray-300 transition duration-150 ease-in-out group-hover:text-gray-200">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                    >
                      Sign out
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 h-0 pt-4 pb-5 overflow-y-auto">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <nav className="flex-1 px-2 mb-5 bg-gray-800">
              {loading ? null : (
                <>
                  {channels.map((channel, i) => (
                    <Link
                      key={channel.id}
                      to={`/chat?channel=${channel.name}`}
                      className={`${
                        i === 0 ? "" : "mt-1"
                      } group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 ${
                        channel.id === selectedChannel.id
                          ? "text-white bg-gray-900"
                          : "text-gray-300 hover:text-white hover:bg-gray-700 focus:text-white"
                      }`}
                      onClick={onCloseSidebar}
                    >
                      <HashtagSVG
                        className={`mr-3 h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 ${
                          channel.name === "general"
                            ? "text-gray-300"
                            : "text-gray-400"
                        }`}
                        stroke="none"
                        fill="currentColor"
                      />
                      {channel.name}
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
