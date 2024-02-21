import React, { useState ,useEffect} from "react";
import { AiFillHome, AiFillBell } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import Post from "./Post";
// import excusesData from "../data.json";
import axios from "axios"

function Mainpage() {
  const [showComments, setShowComments] = useState({});
  const [excusesData, setExcusesData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/excuse");
        setExcusesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        {excusesData.map((post, index) => (
          <Post
            key={index}
            post={post}
            index={index}
            toggleComments={toggleComments}
            showComments={showComments}
          />
        ))}
      </div>
    </div>
  );
}

export default Mainpage;
