import Router, { useRouter } from 'next/router';
import React, { memo, useState } from 'react';
import { IcurrentUser } from '../../src/types/auth';
import styles from './header.module.scss';
import MyLoader from '../Loading';
import useClickOutSide from '../../src/hooks/useClickOutSide';
import useGetElementCoords from '../../src/hooks/useGetElementCoords';
import Popover from '../Popover.tsx';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

const Header = ({ currentUser }: { currentUser: IcurrentUser | null }) => {
  const router = useRouter();
  const [isShowSettings, setIsShowSettings] = useState<boolean>(false);
  const [displayNavMobile, setDisplayNavMobile] = useState(false);
  const { nodeRef } = useClickOutSide(() => setIsShowSettings(false));
  const { coords, elmRef, handleGetElementCoords } = useGetElementCoords();
  const handleToggleSettings = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsShowSettings((s) => !s);
    handleGetElementCoords(e);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Router.push('/login');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <header className="w-full fixed top-0 z-[999] h-[84px]">
      {isShowSettings && (
        <Popover
          coords={coords}
          position="right"
          className="bg-white rounded-2xl shadow w-[230px] py-3 px-5"
        >
          <SettingsContentMemo handleLogout={handleLogout} />
        </Popover>
      )}
      <nav
        className={`border-gray-200 px-4 lg:px-6 py-4 shadow-[0_3px_5px_rgba(57,63,72,0.3)] ${styles.header}`}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <span
            onClick={() => router.push('/')}
            className="flex items-center cursor-pointer"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-[#7a5179]">
              {/* ĐỒI TUYẾT CÓ CHIẾC BÔNG CHÀ */}
            </span>
          </span>
          <div className="flex items-center lg:order-2" ref={nodeRef}>
            {currentUser ? (
              <div
                ref={elmRef}
                onClick={(e) => {
                  handleToggleSettings(e);
                }}
              >
                <img
                  id="avatarButton"
                  data-dropdown-toggle="userDropdown"
                  data-dropdown-placement="bottom-start"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={currentUser.img || ''}
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <a
                href="#"
                className="text-[#7a5179] font-medium rounded-lg text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </a>
            )}

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={() => setDisplayNavMobile(!displayNavMobile)}
            >
              {!displayNavMobile ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>
          <div
            className={`${
              displayNavMobile ? 'block' : 'hidden'
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li className="px-[24px]">
                <span
                  onClick={() => router.push('/longStories')}
                  className="block py-2 pr-4 pl-3 text-[#7a5179] rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 text-2xl cursor-pointer"
                >
                  Tiểu thuyết
                </span>
              </li>
              <li className="px-[24px]">
                <a
                  href="#"
                  className="text-2xl block py-2 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 text-[#7a5179] dark:hover:bg-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Truyện ngắn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const SettingsContentMemo = memo(SettingsContent);
function SettingsContent({ handleLogout }: { handleLogout: () => void }) {
  return (
    <>
      <div>
        <span
          className="font-medium text-gray-700 inline-block hover:text-red-500 cursor-pointer text-base"
          onClick={handleLogout}
        >
          Log out
        </span>
      </div>
    </>
  );
}

export default Header;
