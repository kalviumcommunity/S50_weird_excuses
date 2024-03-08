import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EXCUSE_URL } from "./constant/api";

import anonymous from "../Images/anonymous.png";

const Post = ({
  post,
  index,
  toggleComments,
  showComments,
  setPosts,
  selectedUser,
  refetchData,
}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [excuse, setExcuse] = useState(post.Excuse);

  const handleUpdateExcuse = async () => {
    try {
      const updatedPost = { ...post, Excuse: excuse };
      await axios.put(`${EXCUSE_URL}/${post._id}`, updatedPost);
      setShowPopup(false);
      refetchData();
    } catch (error) {
      console.error("Error updating excuse:", error);
    }
  };

  const deleteExcuse = async () => {
    try {
      await axios.delete(`${EXCUSE_URL}/${post._id}`);
      refetchData();
    } catch (error) {
      console.error("Error deleting excuse:", error);
    }
  };

  const shouldDisplayPost = !selectedUser || post.User_Name === selectedUser;
     return shouldDisplayPost ? (
    <div
      key={index}
      className="border border-gray-300 p-4 mb-4"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      <div className=" mb-4">
        <img src={anonymous} alt="Profile" className="w-12 h-12 rounded-full" />
        <p className="text-gray-700 text-sm mt-2">{post.User_Name}</p>
      </div>
      <p className="text-gray-800 text-">{post.Excuse}</p>
      <div className="flex items-center mt-2">
        <button className="flex items-center mr-4 text-gray-600 hover:text-blue-600 focus:outline-none">
          <AiOutlineLike className="w-5 h-5 mr-1" />
          <span className="text-lg">Like</span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none">
          <FaRegComment className="w-5 h-5 mr-1" />
          <span className="text-lg">Comment</span>
        </button>
      </div>

      {showComments[index] && (
        <div className="mt-4">
          {post.Comments.map((comment, commentIndex) => (
            <div key={commentIndex} className="flex mt-2">
              <p className="text-gray-600 mr-2">{comment.Comment_By}:</p>
              <p className="text-gray-700">{comment.Comment}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex mt-1">
        <p className="text-gray-600 text-lg mr-4">Likes: {post.Likes}</p>
        <p
          className="text-gray-600 cursor-pointer"
          onClick={() => toggleComments(index)}
        >
          Comments: {post.Comments.length}
        </p>
      </div>

      <div className="flex mt-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2 focus:outline-none"
          onClick={() => setShowPopup(true)}
        >
          Update
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none"
          onClick={deleteExcuse}
        >
          Delete
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h2 className="text-lg font-bold mb-4">Update Excuse</h2>
            <input
              type="text"
              value={excuse}
              onChange={(e) => setExcuse(e.target.value)}
              placeholder="Enter excuse"
              className="w-full border rounded-md py-2 px-3 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleUpdateExcuse}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 focus:outline-none"
              >
                Update
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default Post;
