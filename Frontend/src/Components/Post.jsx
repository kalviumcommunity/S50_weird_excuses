import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import {FaRegComment } from "react-icons/fa";

import anonymous from "../Images/anonymous.png";

const Post = ({ post, index, toggleComments, showComments }) => {
  return (
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
                <p className="text-gray-600 mr-2">{comment.Comment_By}:</p>
                <p className="text-gray-600">{comment.Comment}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex mt-1">
          <p className="text-gray-600 mr-4">Likes: {post.Likes}</p>
          <p className="text-gray-600" onClick={() => toggleComments(index)}>
            Comments: {post.Comments.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
