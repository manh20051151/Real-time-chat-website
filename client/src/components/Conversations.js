import React, { useEffect } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../hooks/useGetConversations";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("CONVERSATIONS: ", conversations);
  const { authUser } = useAuthContext();
  console.log(authUser._id);

  if (!conversations) {
    return null; // Trả về null hoặc thông báo lỗi tùy thuộc vào trường hợp
  }
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
