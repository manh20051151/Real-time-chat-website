import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import Skeletons from "./Skeletons";
import useListenMessages from "../hooks/useListenMessages";
import useListenMessagesDe from "../hooks/useListenMessagesDe";
import useListenMessagesDeGr from "../hooks/useListenMessagesDeGr";

const Messages = ({ conversation }) => {
  const { messages, images, loading } = useGetMessages();
  useListenMessages();
  useListenMessagesDe();
  const lastMessageRef = useRef();
  // console.log("conversationconversationconversation", conversation);
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages, images]);
  console.log("messages", messages);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        Array.isArray(messages) &&
        messages.length > 0 &&
        messages.map((message) => {
          return (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} avatar={conversation.avatar} />
            </div>
          );
        })}

      {loading && [...Array(3)].map((_, idx) => <Skeletons key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Chưa có tin nhắn</p>
      )}
    </div>
  );
};

export default Messages;
