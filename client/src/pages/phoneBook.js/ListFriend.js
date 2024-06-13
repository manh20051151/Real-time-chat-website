import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  apiDeleteFriend,
  apiDeleteFriendFr,
  apiGetListFriend,
  apiGetUserById,
} from "../../apis";
import avatar from "../../assets/anhtam.png";
import { toast } from "react-toastify";

const ListFriend = () => {
  const { current } = useSelector((state) => state.user);
  const [senders, setSenders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSenders, setFilteredSenders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const friend = await apiGetListFriend();
        const sendersInfo = await Promise.all(
          friend.friendList.map((senderId) => apiGetUserById(senderId))
        );
        setSenders(sendersInfo);
      } catch (error) {
        console.error("Error fetching request add friends:", error);
      }
    };

    fetchData();
  }, [current]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSenders(senders);
    } else {
      const filtered = senders.filter((sender) =>
        sender.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSenders(filtered);
    }
  }, [searchTerm, senders]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdate = async (userId) => {
    try {
      // const response = await apiDeleteRequestAddFriends(userId);
      const response = await apiDeleteFriend(userId);
      const responseFr = await apiDeleteFriendFr(userId);
      if (response && responseFr) {
        toast.success("Hủy kết Bạn thành công");
        // dispath(getCurrent())
        // Sau khi cập nhật thành công, gọi lại API để lấy danh sách yêu cầu kết bạn mới
        const friend = await apiGetListFriend();
        const sendersInfo = await Promise.all(
          friend.friendList.map((senderId) => apiGetUserById(senderId))
        );
        setSenders(sendersInfo);
      } else {
        toast.error("Hủy kết Bạn thất bại");
      }
    } catch (error) {
      console.error("Error updating friend request:", error);
      toast.error("Có lỗi xảy ra khi cập nhật hủy yêu cầu kết bạn");
    }
  };
  return (
    <div className="flex">
      <div className="flex-1 min-h-screen">
        <div className="h-20 border bg-white border-collapse items-center flex font-bold ">
          <span className="text-[20px] pl-4">Danh Sách bạn bè</span>
        </div>
        <div className="flex justify-end py-4 mr-4">
          <input
            type="text"
            placeholder="Tìm kiếm bạn bè..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {filteredSenders?.map((el, index) => (
          <div
            key={index}
            className="items-center flex h-16 border border-b-gray-50 bg-white"
          >
            <span>
              <img
                src={el.user?.avatar || avatar}
                alt="avatar"
                className="ml-8 h-10 w-10 object-cover rounded-full mr-2"
              />
            </span>
            <span className="pl-12 font-bold w-full"> {el.user.name} </span>
            <div className="pr-8 justify-end w-full flex font-medium">
              <span
                onClick={() => handleUpdate(el.user._id)}
                className="hover:cursor-pointer pr-4"
              >
                Hủy kết bạn
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListFriend;
