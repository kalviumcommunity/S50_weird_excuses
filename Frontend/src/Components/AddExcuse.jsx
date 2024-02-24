import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const ExcusePopup = ({ showPopup,setShowPopup,refetchData }) => {
    const [excuse, setExcuse] = useState('');
    const [excuses, setExcuses] = useState([]);
    

    const handleAddExcuse = async () => {
        try {
            const newExcuse = {
                User_Name: "john_doe", 
                Excuse: excuse,
                Comments: [],
                Likes: 0
            };
    
            const response = await axios.post("http://localhost:3000/excuse", newExcuse);
            console.log(response.data);

            setExcuses(prevExcuses => [...prevExcuses, response.data]);
            setExcuse(''); 
            setShowPopup(false);
            refetchData();
        } catch (error) {
            console.error(error.response.data, "error in the link");
        }
    }



  return (
    showPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
          <h2 className="text-lg font-bold mb-4">Add an excuse</h2>
          <input
            type="text"
            value={excuse}
            onChange={(e) => setExcuse(e.target.value)}
            placeholder="Enter excuse"
            className="w-full border rounded-md py-2 px-3 mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={handleAddExcuse}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
            >
              Add
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ExcusePopup;