import { Link, useNavigate } from "react-router-dom";

import logo from "images/logo.svg";
import { Dropdown } from "components";
import { ReactNode } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full">
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex items-center justify-between py-2">
          {/* Left side of navbar with logo */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/">
              <img src={logo} className="mr-8 w-16" alt="logo" />
            </Link>
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button className="text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
            {/* Desktop menu buttons */}
            <div className="hidden space-x-8 sm:flex">
              <Navbar.Button to="/breeds">Breeds</Navbar.Button>
              <Navbar.Button to="/favourites">Favourites</Navbar.Button>
            </div>
          </div>
          {/* Right side of navbar (user badge and dropdown menu) */}
          <div className="flex items-center">
            {/* User badge */}
            <Dropdown
              trigger={
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                  U
                </div>
              }
            >
              <Dropdown.Button
                onClick={() => {
                  throw new Error();
                }}
              >
                Simulate Javascript Error
              </Dropdown.Button>
              <Dropdown.Button
                onClick={() => {
                  navigate("/some-non-existent-page");
                }}
              >
                Simulate Not Found Error
              </Dropdown.Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface Props {
  to: string;
  children: ReactNode | string;
}

Navbar.Button = ({ to, children }: Props) => {
  return (
    <Link to={to} className="text-white hover:text-blue-500">
      {children}
    </Link>
  );
};

export default Navbar;
