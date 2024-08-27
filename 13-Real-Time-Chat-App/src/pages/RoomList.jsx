import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { databases, DATABASE_ID, ROOMS_COLLECTION_ID } from '../services/appwriteConfig';
import { useAuth } from '../services/AuthContext';
import { LogOut } from "react-feather";
import { Link } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          ROOMS_COLLECTION_ID
        );
        setRooms(response.documents);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (newRoomName.trim() === '') return;
  
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        ROOMS_COLLECTION_ID,
        'unique()',
        {
          name: newRoomName,
          createdBy: user.name,
          createdAt: new Date().toISOString(),
        },
        []
      );
      setRooms([...rooms, response]);
      setNewRoomName('');
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleJoinRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <header className="p-4 bg-gray-900 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">Chat Rooms</h1>
        <div>
          {user && (
            <Link to="/">
              <LogOut className="text-[#c7d8eb] cursor-pointer transition duration-300 hover:text-[#8db3dd]" onClick={handleLogout}/>
            </Link>
          )}
        </div>
      </header>
      <main className="p-6">
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Enter room name"
            className="p-2 mr-4 border text-black border-gray-700 rounded"
          />
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Create Room
          </button>
        </div>
        <ul className="space-y-4">
          {rooms.map((room) => (
            <li
              key={room.$id}
              className="p-4 bg-gray-900 rounded shadow-md cursor-pointer hover:bg-gray-700"
              onClick={() => handleJoinRoom(room.$id)}
            >
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p className="text-gray-400">Created by: <span className='font-bold'>{room.createdBy}</span></p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default RoomList;
