import {Link } from "react-router-dom";

export const Header = () => {
    return (
      <nav className="bg-white p-4 fixed top-0 left-0 w-full shadow-md">
        <ul className="flex justify-center space-x-6">
          <li>
            <a className="text-white hover:text-gray-300" href="/">Home</a>
          </li>
          <li>
            <a className="text-white hover:text-gray-300" href="/about">About</a>
          </li>
          <li>
            <a className="text-white hover:text-gray-300" href="/blog">Blog</a>
          </li>
          <li>
            <a className="text-white hover:text-gray-300" href="/blog">Create Blog </a>
          </li>
        </ul>
      </nav>
    );
  };
  