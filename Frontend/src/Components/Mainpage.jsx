import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillHome, AiFillBell } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import Post from "./Post";
import ExcusePopup from "./AddExcuse";
import UserProfile from "./UserProfile";
import anonymous from "../Images/anonymous.png";
import Cookies from "js-cookie";
import { EXCUSE_URL,USERS_URL } from "./constant/api";

function Mainpage() {
  const [showComments, setShowComments] = useState({});
  const [excusesData, setExcusesData] = useState([]);
  const [excuse, setExcuse] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [usernames, setUsernames] = useState({});

  const username = Cookies.get("username");

  useEffect(() => {
    fetchData();
    fetchUsers();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(EXCUSE_URL);
      setExcusesData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(USERS_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleComments = (index) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [index]: !prevShowComments[index],
    }));
  };

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId || null);
  };

  const filteredExcuses = selectedUser
    ? excusesData.filter((excuse) => excuse.User_Name === selectedUser)
    : excusesData;

    return (
      <div className="flex justify-center">
        <ExcusePopup
          showPopup={showPopup}
          excuse={excuse}
          setExcuse={setExcuse}
          setShowPopup={setShowPopup}
          refetchData={fetchData}
        />
        <div className="w-1/4 bg-gray-200 h-screen p-8">
          <div className="p-4 flex flex-col justify-between border-black border-2 h-full align-center">
            <div>
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
              <button
                onClick={() => setShowPopup(true)}
                className="text-gray-800 bg-blue-600 mb-4 hover:bg-blue-400 transition-colors duration-300 flex items-center p-2 rounded-2xl"
              >
                Add an excuse
              </button>
            </div>
            <div>
              <UserProfile profilePhoto={anonymous} username={username} />
            </div>
          </div>
        </div>

      <div className="w-3/4 bg-gray-100 h-screen p-8 overflow-x-auto">
        <label htmlFor="userSelect" className="text-gray-800 mb-2">
          Select User:
        </label>
        <select
          id="userSelect"
          className="w-full bg-white border border-gray-300 rounded py-2 px-4 mb-2"
          onChange={handleUserChange}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={String(user._id)} value={user.User_Name}>
              {user.User_Name}
            </option>
          ))}
        </select>
        {filteredExcuses.map((post, index) => {
          return (
            <Post
              key={index}
              post={post}
              index={index}
              toggleComments={toggleComments}
              showComments={showComments}
              selectedUser={selectedUser}
              refetchData={fetchData}
              username={username}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Mainpage;
