import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiDeleteMessage } from "../apis";

const useDeleteMessage = () => {
  const [deleting, setDeleting] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const deleteMessage = async (messageId) => {
    setDeleting(true);
    try {
      const res = await apiDeleteMessage(messageId);
      if (res.error) {
        throw new Error(res.error);
      }
      const updatedMessages = messages.filter(
        (message) => message._id !== messageId
      );
      setMessages(updatedMessages);
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return { deleting, deleteMessage };
};
export default useDeleteMessage;
