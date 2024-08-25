import React, {useState, useEffect} from 'react'
import client, {databases, DATABASE_ID, MESSAGES_COLLECTION_ID} from '../services/appwriteConfig'
import { ID, Query, Permission, Role} from 'appwrite';
import Header from '../components/Header';
import { useAuth } from '../services/AuthContext';
import { Trash2 } from 'react-feather';

const Room = () => {
  return (
    <div className="p-8 bg-[rgba(27,27,39,1)] rounded-b-lg border border-[rgba(40,41,57,1)]">
      <div className="flex flex-col gap-2">
        {/* Message Form */}
        <form id="message--form" className="flex flex-col gap-2">
          {/* Your message input fields and buttons go here */}
        </form>

        {/* Messages Display */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex justify-between items-center">
            {/* Message header content here */}
          </div>
          <div className="bg-[rgba(219,26,90,1)] text-[rgb(226,227,232)] p-4 rounded-lg max-w-full break-words">
            {/* Message body content here */}
          </div>
          <div className="text-[rgb(164,161,161)] ml-4">
            {/* Timestamp or other metadata */}
          </div>
        </div>

        {/* Send Button */}
        <div className="flex justify-end mt-4">
          <button className="bg-[#8db3dd] text-white p-2 rounded-md transition duration-300 hover:opacity-70">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
