import React from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import avatar from "../assets/anhtam.png";

const Conversation = ({ conversation, lastIdx }) => {
  const conversationn = conversation.user;
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversationn?._id;
  const { onlineUsers } = useSocketContext();
  console.log("online", onlineUsers);
  const isOnline = onlineUsers.includes(conversationn?._id);
  return (
    <div>
      <div
        className={`pt-3 pb-3  flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}
      `}
        onClick={() => setSelectedConversation(conversationn)}
      >
        <div className={`avatar ${isOnline ? "online" : ""} mt-0 `}>
          <div className="w-20 rounded-full justify-center">
            {/* <img  src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} /> */}
            <img
              src={conversationn?.avatar || avatar}
              alt="logo"
              className="w-16 h-16 "
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black"> {conversationn.name} </p>
            <span></span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </div>
  );
};

export default Conversation;
