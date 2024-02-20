import React, { useState } from "react";
import { AiFillHome, AiFillBell, AiOutlineLike } from "react-icons/ai";
import { FaBookmark, FaRegComment } from "react-icons/fa";
import anonymous from "../Images/anonymous.png";

import excusesData from "../data.json";

function Firstpage() {
  const [showComments, setShowComments] = useState({});

  const toggleComments = (index) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [index]: !prevShowComments[index],
    }));
  };

  
  return (
    <div className="flex justify-center">
      <div className="w-1/4 bg-gray-200 h-screen p-8">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <h1 className="text-xl font-bold">Weird Excuses</h1>
          </div>
          <nav className="flex flex-col justify-start">
            <a
              href="#"
              className="text-gray-800 bg-gray-400 mb-4 hover:bg-gray-400 transition-colors duration-300 flex items-center p-2 rounded-2xl"
            >
              <AiFillHome className="w-6 h-6 mr-2" />
              Home
            </a>
            <a
              href="#"
              className="text-gray-800 mb-4 hover:bg-gray-400 transition-colors duration-300 flex items-center p-2 rounded-2xl"
            >
              <AiFillBell className="w-6 h-6 mr-2" />
              Notifications
            </a>
            <a
              href="#"
              className="text-gray-800 mb-4 hover:bg-gray-400 transition-colors duration-300 flex items-center p-2 rounded-2xl"
            >
              <FaBookmark className="w-6 h-6 mr-2" />
              Bookmarks
            </a>
          </nav>
        </div>
      </div>

      <div className="w-3/4 bg-gray-100 h-screen p-8 overflow-x-auto">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
          {excusesData.map((post, index) => (
            <div key={index} className="border border-gray-300 p-4 mb-4 flex">
              <div className="mr-4">
                <img
                  src={anonymous}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <p className="text-gray-700 text-sm mt-2">{post.User_Name}</p>
              </div>
              <div>
                <p className="text-gray-700">{post.Excuse}</p>
                <div className="flex items-center mt-2">
                  <button className="flex items-center mr-4">
                    <AiOutlineLike className="w-5 h-5 mr-1" />
                    <span>Like</span>
                  </button>

                  <button className="flex items-center">
                    <FaRegComment className="w-5 h-5 mr-1" />
                    <span>Comment</span>
                  </button>
                </div>

                {showComments[index] && (
                  <div>
                    {post.Comments.map((comment, commentIndex) => (
                      <div key={commentIndex} className="flex mt-2">
                        <p className="text-gray-600 mr-2">
                          {comment.Comment_By}:
                        </p>
                        <p className="text-gray-600">{comment.Comment}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex mt-1">
                  <p className="text-gray-600 mr-4">Likes: {post.Likes}</p>
                  <p
                    className="text-gray-600"
                    onClick={() => toggleComments(index)}
                  >
                    Comments: {post.Comments.length}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Firstpage;
