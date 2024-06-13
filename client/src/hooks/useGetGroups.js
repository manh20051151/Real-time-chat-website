import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiGetListGroup } from "../apis";

const useGetListGroup = () => {
  const [loading, setLoading] = useState(false);
  const { groups, setGroups, selectedConversation } = useConversation();
  // console.log(apiGetMessage(selectedConversation._id));

  useEffect(() => {
    const getGroups = async () => {
      setLoading(true);
      try {
        const res = await apiGetListGroup();
        setGroups(res);
        console.log("res group: ", res);
        if (res.error) throw new Error(res.error);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getGroups();
  }, [setGroups]);
  return { groups, loading };
};
export default useGetListGroup;
