import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiSendMesage } from "../apis";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const data = { message: message };
      const res = await apiSendMesage(data, selectedConversation._id);
      // const data = await res.json();
      console.log("data: ", res);

      if (res.error) {
        throw new Error(res.error);
      }
      setMessages([...messages, res]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
