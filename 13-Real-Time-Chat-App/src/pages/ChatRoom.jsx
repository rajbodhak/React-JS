import React, { useState, useEffect } from 'react';
import client, { databases, DATABASE_ID, MESSAGES_COLLECTION_ID } from '../services/appwriteConfig';
import { ID, Query, Permission, Role } from 'appwrite';
import Header from '../components/Header';
import { useAuth } from '../services/AuthContext';
import { Trash2 } from 'react-feather';

const ChatRoom = () => {
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`,
      response => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          console.log("A MESSAGE WAS CREATED");
          setMessages(prevState => [response.payload, ...prevState]);
        }

        if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
          console.log("A MESSAGE WAS DELETED!!!");
          setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id));
        }
      }
    );

    getMessages(); // Fetch initial messages when component loads

    return () => {
      unsubscribe(); // Add parentheses to actually invoke the unsubscribe function
    };
  }, []);

  const getMessages = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        [
          Query.orderDesc('$createdAt'),
          Query.limit(100),
        ]
      );
      console.log(response.documents);
      setMessages(response.documents);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("MESSAGE: ", messageBody);

    if (!user || !user.$id) {
      alert("User not authenticated!");
      return;
    }

    const permissions = [
      Permission.write(Role.user(user.$id)),
    ];

    const payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        ID.unique(),
        payload,
        permissions
      );
      console.log("RESPONSE: ", response);

      setMessageBody("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const deleteMessage = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, MESSAGES_COLLECTION_ID, id);
    } catch (error) {
      console.error("Failed to delete message:", error);
      alert("Failed to delete message. Please try again.");
    }
  };

  return (
    <main className="container mx-auto max-w-lg p-5 ">
      <Header />
      <div className="p-8 bg-[rgba(27,27,39,1)] rounded-b-lg border border-[rgba(40,41,57,1)] max-h-[85vh] overflow-y-auto">
        
        {/* Message Form */}
        <form id="message--form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <textarea
              required
              maxLength="250"
              placeholder="Say something..."
              onChange={(e) => setMessageBody(e.target.value)}
              value={messageBody}
              className="w-full p-4 bg-[rgba(20,20,31,11)] text-white border-b border-[rgba(40,41,57,1)] rounded-md outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <input
              className="btn bg-[#8db3dd] text-white py-2 px-4 rounded-md transition duration-300 hover:opacity-70 cursor-pointer"
              type="submit"
              value="Send"
            />
          </div>
        </form>

        {/* Messages Display */}
        <div className="mt-6 space-y-4">
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper flex flex-col gap-2 text-white">
              
              <div className="flex justify-between items-center">
                <p className="text-white">
                  {message?.username ? <span>{message?.username}</span> : 'Anonymous user'}
                  <small className="message-timestamp text-[rgb(164,161,161)] ml-4">
                    {new Date(message.$createdAt).toLocaleString()}
                  </small>
                </p>

                {message.$permissions.includes(`delete("user:${user.$id}")`) && (
                  <Trash2
                    className="text-[#8db3dd] cursor-pointer transition duration-300 hover:text-red-500"
                    onClick={() => deleteMessage(message.$id)}
                  />
                )}
              </div>

              <div
                className={`p-4 rounded-lg max-w-full break-words ${message.user_id === user.$id ? 'border border-[rgba(219,26,90,1)] bg-[rgba(27,27,39,1)] text-right' : 'bg-[rgba(219,26,90,1)] text-[rgb(226,227,232)]'}`}
              >
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ChatRoom;
