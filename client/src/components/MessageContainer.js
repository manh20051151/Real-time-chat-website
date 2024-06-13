import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessage } from "react-icons/ti";
import useConversation from "../zustand/useConversation";
import MessageInputGroup from "./MessageInputGroup";
import MessagesGroup from "./MessagesGroup";
import avatar from "../assets/anhtam.png";
import { MdGroupAdd, MdOutlineDeleteForever } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import GroupMemberList from "./GroupMemberList";
import {
  apiCreateGroup,
  apiDeleteGroup,
  apiGetGroup,
  apiOutGroup,
  apiUpdateAvtarGroup,
  apiUpdateNameGroup,
} from "../apis";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import path from "../ultils/path";
import Button from "./Button";
import useListenSocket from "../hooks/useListenSocket";
import { useSocketContext } from "../context/SocketContext";

const MessageContainer = () => {
  const {
    selectedConversation,
    setSelectedConversation,
    setSelectedAddMember,
    setSelectedAddDeputy,
    setSelectedUpdateLeader,
    selectedAddDeputy,
    selectedUpdateLeader,
    isModelUpdateNameGroup,
    setIsModelUpdateNameGroup,
    isUpdateAvatarGroup,
    setIsUpdateAvatarGroup,
    isSockett,
    setIsSockett,
  } = useConversation();
  const { current } = useSelector((state) => state.user);
  const [leader, setLeader] = useState([]);
  const [nameGroup, setNameGroup] = useState("");
  const { socket } = useSocketContext();
  useEffect(() => {
    socket?.on("newSocket", async () => {
      const updatedConversation = await apiGetGroup(selectedConversation?._id);
      setSelectedConversation(updatedConversation.group);
    });
    return () => socket?.off("newSocket");
  }, [socket]);

  useEffect(() => {
    socket?.on("SocketupdateAvatarGroup", async () => {
      const updatedConversation = await apiGetGroup(selectedConversation?._id);
      setSelectedConversation(updatedConversation.group);
    });
    return () => socket?.off("SocketupdateAvatarGroup");
  }, [socket]);

  useEffect(() => {
    const updateLeader = async () => {
      if (selectedConversation?._id) {
        const updatedConversation = await apiGetGroup(selectedConversation._id);
        setSelectedConversation(updatedConversation.group);

        const response = await apiGetGroup(selectedConversation._id);
        setLeader(response.group.leader);
      }
    };

    socket?.on("SocketupdateLeader", updateLeader);

    return () => socket?.off("SocketupdateLeader", updateLeader);
  }, [socket, selectedConversation]);

  const handleAddMember = () => {
    setSelectedAddMember(true);
  };
  const handleAddDeputy = () => {
    setSelectedAddDeputy(true);
  };
  const handleUpdateLeader = () => {
    setSelectedUpdateLeader(true);
  };
  const handleOutGroup = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Bạn có muốn rời nhóm không?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiOutGroup(selectedConversation._id);
        window.location.href = `/${path.HOME}/${path.HOMELAYOUT}`;
      }
    });
  };
  const handleDeleteGroup = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Bạn có muốn giải tán nhóm không?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteGroup(selectedConversation._id);
        window.location.href = `/${path.HOME}/${path.HOMELAYOUT}`;
      }
    });
  };

  console.log(
    "selectedConversationselectedConversation: ",
    selectedConversation
  );
  // const isGroup = selectedConversation.hasOwnProperty('nameGroup');

  let isGroup;
  async function isgroups() {
    while (!selectedConversation) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Đợi 1 giây trước khi kiểm tra lại
    }

    // Khi groups và groups.groups đã tồn tại
    isGroup = selectedConversation.hasOwnProperty("nameGroup");
  }

  isgroups();
  console.log("isGroup", isGroup);
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsee = await apiGetGroup(selectedConversation?._id);
        // if(isgroups)
        setLeader(responsee.group.leader);
      } catch (error) {
        console.error("Error fetching request add friends:", error);
      }
    };

    fetchData();
  }, [
    selectedConversation,
    setSelectedConversation,
    selectedUpdateLeader,
    selectedAddDeputy,
  ]);

  const handleUpdateNameGroup = async () => {
    const response = await apiUpdateNameGroup(
      selectedConversation._id,
      nameGroup
    );

    if (response.success) {
      toast.success(response.mes);
      setIsModelUpdateNameGroup(false);

      const updatedConversation = await apiGetGroup(selectedConversation._id);
      setSelectedConversation(updatedConversation.group);
    } else {
      toast.info(response.mes);
    }
  };

  const handleImageClick = () => {
    document.getElementById("avatarGroup").click();
  };
  const photoPicker = async (e) => {
    e.preventDefault();
    console.log(e.target.files);
    try {
      const file = e.target.files[0];
      console.log("file", file);
      console.log("e.target.files", e.target.files);
      const formData = new FormData();
      formData.append("avatarGroup", file);
      console.log("formData:", formData);
      await apiUpdateAvtarGroup(formData, selectedConversation._id);

      setIsUpdateAvatarGroup(true);
      const updatedConversation = await apiGetGroup(selectedConversation._id);
      setSelectedConversation(updatedConversation.group);
      setIsUpdateAvatarGroup(false);
    } catch (error) {
      console.error("Error uploading avatarGroup:", error);
    }
  };
  return (
    <div className=" flex" style={{ width: "-webkit-fill-available" }}>
      {isGroup ? (
        <>
          {!selectedConversation ? (
            <NoChatSelected />
          ) : (
            <>
              <div className=" w-full flex ">
                {isModelUpdateNameGroup && (
                  <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay items-center z-10 flex flex-col pt-10">
                    <div className="flex flex-col gap-4">
                      <label htmlFor="nameGroup" className="text-white">
                        Nhập tên nhóm:{" "}
                      </label>
                      <input
                        type="text"
                        id="nameGroup"
                        className="w-[800px]  pb-2 border-b outline-none"
                        placeholder="Tên nhóm"
                        value={nameGroup}
                        onChange={(e) => setNameGroup(e.target.value)}
                      />
                    </div>
                    <div className="mt-4 flex gap-4">
                      <Button
                        name="Xác nhận"
                        handleOnClick={handleUpdateNameGroup}
                      />

                      <Button
                        name="Trở về"
                        handleOnClick={() => setIsModelUpdateNameGroup(false)}
                      />
                    </div>
                  </div>
                )}
                <div className="flex w-full flex-col ">
                  <div className="bg-blue-500 px-4 py-2 mb-2">
                    <span className="text-black text-2xl font-bold">
                      {selectedConversation.nameGroup}
                    </span>
                  </div>
                  <MessagesGroup conversation={selectedConversation} />
                  <MessageInputGroup />
                </div>
                <div className=" w-[500px] bg-white">
                  <div className="font-bold text-[24px] flex w-full items-center  flex-col py-2 border border-b-gray-400">
                    Thông tin nhóm
                  </div>
                  <div className="flex w-full items-center  flex-col mt-8">
                    <span className="flex  ">
                      <img
                        src={selectedConversation?.avatar || avatar}
                        alt="avatar"
                        className=" h-20 w-20 object-cover rounded-full"
                      />
                      {leader.includes(current._id) && (
                        <span
                          onClick={handleImageClick}
                          className="pl-2  font-bold text-[16px] hover:cursor-pointer"
                        >
                          <FaEdit />
                        </span>
                      )}
                      <input
                        type="file"
                        name="avatarGroup"
                        id="avatarGroup"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={photoPicker}
                      />
                    </span>
                    <span className="flex  ">
                      <span className=" font-bold text-[24px]">
                        {" "}
                        {selectedConversation.nameGroup}{" "}
                      </span>
                      {leader.includes(current._id) && (
                        <span
                          onClick={() => setIsModelUpdateNameGroup(true)}
                          className="pl-2  font-bold text-[16px] hover:cursor-pointer"
                        >
                          <FaEdit />
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div
                      className="pl-4 flex items-center hover:bg-blue-100 h-[50px] hover:cursor-pointer"
                      onClick={handleAddMember}
                    >
                      <span>
                        <MdGroupAdd />
                      </span>
                      <span className="pl-2">Thêm thành viên</span>
                    </div>
                    {leader.includes(current._id) && (
                      <div
                        onClick={handleAddDeputy}
                        className="pl-4 flex items-center hover:bg-blue-100 h-[50px] hover:cursor-pointer"
                      >
                        <span>
                          <RiAdminFill />
                        </span>
                        <span className="pl-2">Thêm phó nhóm</span>
                      </div>
                    )}
                    {leader.includes(current._id) && (
                      <div
                        onClick={handleUpdateLeader}
                        className="pl-4 flex items-center hover:bg-blue-100 h-[50px] hover:cursor-pointer"
                      >
                        <span>
                          <GrUserAdmin />
                        </span>
                        <span className="pl-2">Chuyển trưởng nhóm</span>
                      </div>
                    )}
                    {!leader.includes(current._id) && (
                      <div
                        onClick={handleOutGroup}
                        className="pl-4 flex items-center hover:bg-blue-100 h-[50px] hover:cursor-pointer"
                      >
                        <span>
                          <IoLogOut />
                        </span>
                        <span className="pl-2">Rời nhóm</span>
                      </div>
                    )}
                    {leader.includes(current._id) && (
                      <div
                        onClick={handleDeleteGroup}
                        className="pl-4 flex items-center hover:bg-blue-100 h-[50px] hover:cursor-pointer"
                      >
                        <span>
                          <MdOutlineDeleteForever />
                        </span>
                        <span className="pl-2">Giải tán nhóm</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <GroupMemberList />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {!selectedConversation ? (
            <NoChatSelected />
          ) : (
            <>
              <div className=" w-full flex flex-col">
                <div className="bg-blue-500 px-4 py-2 mb-2">
                  <span className="text-black text-2xl font-bold">
                    {selectedConversation.name}
                  </span>
                </div>
                <Messages conversation={selectedConversation} />

                <MessageInput />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MessageContainer;

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
