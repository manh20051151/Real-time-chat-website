import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessage } from "react-icons/ti";
import useConversation from "../zustand/useConversation";

const MessageGroupContainer = () => {
  const { selectedConversationGroup, setSelectedConversationGroup } =
    useConversation();

  useEffect(() => {
    return () => setSelectedConversationGroup(null);
  }, [setSelectedConversationGroup]);

  return (
    <div
      className="md:min-w[850px] flex flex-col"
      style={{ width: "-webkit-fill-available" }}
    >
      {!selectedConversationGroup ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-blue-500 px-4 py-2 mb-2">
            <span className="text-black text-2xl font-bold">
              {" "}
              {selectedConversationGroup.nameGroup}{" "}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageGroupContainer;

const NoChatSelected = () => {
  // const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋</p>
        <p>Select a chat to start messaging</p>
        <TiMessage className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
