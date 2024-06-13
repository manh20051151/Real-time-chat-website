import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiGetMessageGroup } from "../apis";

const useGetMessagesGroup = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation, images, setImages } =
    useConversation();
  // console.log(apiGetMessage(selectedConversation._id));
  console.log(
    "selectedConversation selectedConversation: ",
    selectedConversation
  );
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        console.log("new: ", selectedConversation._id);
        const res = await apiGetMessageGroup(selectedConversation._id);
        // const res = await fetch(`http://localhost:5000/api/message/${selectedConversation._id}`);
        // const res = await instance.get(`/message/${selectedConversation._id}`);
        console.log("res: ", res);
        setMessages(res);

        if (res.error) throw new Error(res.error);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation._id) getMessages();
  }, [selectedConversation._id, setMessages, setImages]);
  return { messages, images, loading };
};
export default useGetMessagesGroup;
