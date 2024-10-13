import React, { useState } from "react";
import useSendMessage from "../../context/useSendMessage";
// import useSendMessage from "../../context/useSendMessage.js";


function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="flex space-x-1 h-[8vh]  bg-gray-800 px-5 pb-2">
        <div className=" w-[100%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-700 rounded-xl outline-none mt-1 px-4 py-3 w-full"
          />
        </div>
        <button className="text-white">
        <i className="fa-regular fa-paper-plane fa-xl"></i>
      </button>
    </div>
    </form >
  );
}

export default Typesend;