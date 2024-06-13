import { useEffect, useRef } from "react";
import Message from "./Message";
import Skeletons from "./Skeletons";
import useListenMessages from "../hooks/useListenMessages";
import useListenMessagesDe from "../hooks/useListenMessagesDe";
import useGetMessagesGroup from "../hooks/useGetMessagesGroup";
import useListenMessagesDeGr from "../hooks/useListenMessagesDeGr";

const MessagesGroup = ({ conversation }) => {
  const { messages, images, loading } = useGetMessagesGroup();
  useListenMessages();
  useListenMessagesDe();
  useListenMessagesDeGr();
  const lastMessageRef = useRef();
  console.log("conversationconversationgr: ", conversation);
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages, images]);
  // console.log("messagesgr", messages);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        Array.isArray(messages) &&
        messages.length > 0 &&
        messages.map((message) => {
          return (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
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

export default MessagesGroup;
