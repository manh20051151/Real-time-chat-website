import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { apiGetMessageGroup } from "../apis";
import toast from "react-hot-toast";

const useListenMessagesDeGr = () => {
  const { socket } = useSocketContext();
  const { setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const handleMessageDeleted = (deletedMessageId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== deletedMessageId)
      );
      fetchMessages();
    };

    const fetchMessages = async () => {
      try {
        const res = await apiGetMessageGroup(selectedConversation._id);
        setMessages(res);
        if (res.error) {
          throw new Error(res.error);
        } else if (res.length === 0) {
          toast.success("Không có tin nhắn.");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tải tin nhắn: " + error.message);
      }
    };

    if (socket) {
      socket.on("messageDeleted", handleMessageDeleted);
    }

    return () => {
      if (socket) {
        socket.off("messageDeleted", handleMessageDeleted);
      }
    };
  }, [socket, selectedConversation._id, setMessages]);

  return null; // Trả về null nếu không có gì để render
};

export default useListenMessagesDeGr;
