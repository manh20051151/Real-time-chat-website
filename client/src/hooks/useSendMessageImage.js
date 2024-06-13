import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiSendMesageImage } from "../apis";

const useSendMessageImage = () => {
  const [loading, setLoading] = useState(false);
  //   const { images, setImages, selectedConversation } = useConversation();
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessageImage = async (formData) => {
    setLoading(true);
    try {
      //   const data = { image: formData };
      const res = await apiSendMesageImage(formData, selectedConversation._id);
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

  return { loading, sendMessageImage };
};

export default useSendMessageImage;
