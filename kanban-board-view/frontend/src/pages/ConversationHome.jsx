import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const ConversationHome = () => {
    const [conversations, setConversations] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredConversations, setFilteredConversations] = useState([]);

    useEffect(() => {
        // Fetch conversations on component mount
        const fetchConversations = async () => {
            try {
                const res = await axios.get("http://localhost:3000/conversations", { withCredentials: true });
                console.log(res.data.conversations); // Log to confirm response structure
                setConversations(res.data.conversations); // Store original conversations
                setFilteredConversations(res.data.conversations); // Initialize filtered with all conversations
            } catch (error) {
                alert("Error fetching conversations: " + error.message);
                console.error("Error:", error);
            }
        };

        fetchConversations();
    }, []);

    useEffect(() => {
        // Filter conversations whenever the search term changes
        const filtered = conversations.filter(conversation =>
            conversation.title.toLowerCase().includes(search.toLowerCase()) ||
            conversation.access_code?.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredConversations(filtered);
    }, [search, conversations]); // Dependencies: search term and conversations list

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
            <div className='flex-col items-center justify-center w-[60%]'>
                {/* Conversation Access Code Input Section */}
                <div className="flex flex-col items-center w-full p-6 bg-white shadow-lg rounded-lg mb-8">
                    <h1 className="text-2xl font-semibold text-blue-600 mb-4">Enter Access Code or Title</h1>
                    <input
                        type="text"
                        placeholder="Enter the conversation access code or title"
                        className="w-full p-3 border border-blue-300 rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Display Filtered Conversations */}
                <div className="w-full p-6 bg-white shadow-md rounded-lg h-[300px] overflow-y-auto">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Similar Conversations</h2>
                    {
                        filteredConversations.length > 0 ? (
                            filteredConversations.map((conversation) => (
                                <Link key={conversation._id} to={`/conversation/${conversation._id}`}>
                                    <div key={conversation._id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                                        <h3 className="text-lg font-medium text-blue-600">{conversation.title}</h3>
                                        <p className="text-sm text-gray-600">{conversation.access_code}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No conversations found</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ConversationHome;
