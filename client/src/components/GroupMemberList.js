import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Collapse, Typography } from "antd";
import styled from "styled-components";
import useGetListGroup from "../hooks/useGetGroups";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import {
  apiCreateGroup,
  apiDeleteDeputy,
  apiDeleteMember,
  apiGetGroup,
  apiGetListGroup,
  apiGetUserById,
} from "../apis";
import { toast } from "react-toastify";
import avatar from "../assets/anhtam.png";
import { useSelector } from "react-redux";
import { FaKey } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSocketContext } from "../context/SocketContext";

const { Panel } = Collapse;

const GroupMemberList = () => {
  const { socket } = useSocketContext();
  // const [ismodel, setIsmodel] = useState(false);

  useEffect(() => {
    socket?.on("SocketupdateDeputy", async () => {
      const responsee = await apiGetGroup(selectedConversation._id);

      setDeputy(responsee.group?.deputys);
    });
    return () => socket?.off("SocketupdateDeputy");
  }, [socket]);

  useEffect(() => {
    socket?.on("SocketUpdateMember", async () => {
      const response = await apiGetGroup(selectedConversation._id);
      const sendersInfo = await Promise.all(
        response.group.participants.map((senderId) => apiGetUserById(senderId))
      );
      setGroupMember(sendersInfo);
    });
    return () => socket?.off("SocketUpdateMember");
  }, [socket]);

  useEffect(() => {
    socket?.on("SocketupdateLeader", async () => {
      const responsee = await apiGetGroup(selectedConversation._id);

      setLeader(responsee.group?.leader);
    });
    return () => socket?.off("SocketupdateLeader");
  }, [socket]);

  useEffect(() => {
    socket?.on("SocketdeleteDeputy", async () => {
      const responsee = await apiGetGroup(selectedConversation._id);

      setDeputy(responsee.group?.deputys);
    });
    return () => socket?.off("SocketdeleteDeputy");
  }, [socket]);

  useEffect(() => {
    socket?.on("SocketDeleteMemberr", async () => {
      const response = await apiGetGroup(selectedConversation._id);
      const sendersInfo = await Promise.all(
        response.group.participants.map((senderId) => apiGetUserById(senderId))
      );
      setGroupMember(sendersInfo);
    });
    return () => socket?.off("SocketDeleteMemberr");
  }, [socket]);

  useEffect(() => {
    socket?.on("SocketoutGroup", async () => {
      const response = await apiGetGroup(selectedConversation._id);
      const sendersInfo = await Promise.all(
        response.group.participants.map((senderId) => apiGetUserById(senderId))
      );
      setGroupMember(sendersInfo);
    });
    return () => socket?.off("SocketoutGroup");
  }, [socket]);

  const {
    selectedConversation,
    selectedAddMember,
    selectedAddDeputy,
    setSelectedAddDeputy,
    selectedUpdateLeader,
  } = useConversation();
  const PanelStyled = styled(Panel)`
    &&& {
      .ant-collapse-header,
      p {
        font-size: 16px;
      }
    }
  `;
  const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
  `;
  const { authUser } = useAuthContext();
  const { current } = useSelector((state) => state.user);
  // const {groups, loading} = useGetListGroup()
  // const [filteredGroups, setFilteredGroups] = useState([]);
  const [members, setGroupMember] = useState([]);
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await apiGetGroup(selectedConversation._id);
          const sendersInfo = await Promise.all(
            response.group.participants.map((senderId) =>
              apiGetUserById(senderId)
            )
          );
          setGroupMember(sendersInfo);
        } catch (error) {
          console.error("Error fetching request add friends:", error);
        }
      };

      fetchData();
    },
    [
      selectedAddMember,
      selectedConversation,
      selectedAddDeputy,
      setSelectedAddDeputy,
    ]
    // [ismodel]
  );
  const [leader, setLeader] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsee = await apiGetGroup(selectedConversation._id);

        setLeader(responsee.group?.leader);
      } catch (error) {
        console.error("Error fetching request add friends:", error);
      }
    };

    fetchData();
  }, [
    selectedAddMember,
    selectedConversation,
    selectedUpdateLeader,
    selectedAddDeputy,
  ]);

  const [deputy, setDeputy] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsee = await apiGetGroup(selectedConversation._id);

        setDeputy(responsee.group?.deputys);
      } catch (error) {
        console.error("Error fetching request add friends:", error);
      }
    };

    fetchData();
  }, [
    selectedAddMember,
    selectedConversation,
    selectedAddDeputy,
    selectedUpdateLeader,
  ]);
  console.log("current._id", current._id);

  const handleDeleteMember = (memberId) => {
    Swal.fire({
      title: "Thông báo",
      text: "Bạn có muốn xóa thành viên này không?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteMember(
          selectedConversation._id,
          memberId
        );

        const responses = await apiGetGroup(selectedConversation._id);
        const sendersInfo = await Promise.all(
          responses.group.participants.map((senderId) =>
            apiGetUserById(senderId)
          )
        );
        setGroupMember(sendersInfo);
      }
    });
  };
  const handleDeleteDeputy = (memberId) => {
    Swal.fire({
      title: "Thông báo",
      text: "Bạn có muốn gỡ phó nhóm của thành viên này không?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteDeputy(
          selectedConversation._id,
          memberId
        );
        const responsee = await apiGetGroup(selectedConversation._id);

        setDeputy(responsee.group?.deputys);
      }
    });
  };

  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <PanelStyled header="Danh sách thành viên trong nhóm" key="1">
          {members.map((filteredGroup) => (
            <LinkStyled
              className=" "
              key={filteredGroup._id}
              // onClick={() => setSelectedConversation(filteredGroup)}
            >
              <span className="flex items-center">
                <img
                  src={filteredGroup.user?.avatar || avatar}
                  alt="logo"
                  className=" w-12 h-12 object-cover  rounded-full"
                />
                <span className="flex  w-full font-bold text-black ml-2">
                  {filteredGroup.user?.name}
                  {leader.includes(filteredGroup.user._id) && (
                    <FaKey className="ml-2 text-yellow-500" />
                  )}
                  {deputy.includes(filteredGroup.user._id) && (
                    <FaKey className="ml-2 text-blue-500" />
                  )}
                </span>

                {leader.includes(current._id) &&
                  !leader.includes(filteredGroup.user._id) && (
                    <div className="pr-0 justify-end w-full flex font-medium">
                      <span
                        onClick={() =>
                          handleDeleteMember(filteredGroup.user._id)
                        }
                        className="hover:cursor-pointer pr-4 hover:text-blue-800"
                      >
                        Xóa
                      </span>

                      {deputy.includes(filteredGroup.user._id) && (
                        <span
                          className="hover:cursor-pointer  hover:text-blue-800"
                          onClick={() =>
                            handleDeleteDeputy(filteredGroup.user._id)
                          }
                        >
                          Gỡ phó nhóm
                        </span>
                      )}
                    </div>
                  )}

                {deputy.includes(current._id) &&
                  !leader.includes(filteredGroup.user._id) &&
                  !deputy.includes(filteredGroup.user._id) && (
                    <div className="pr-8 justify-end w-full flex font-medium">
                      <span
                        onClick={() =>
                          handleDeleteMember(filteredGroup.user._id)
                        }
                        className="hover:cursor-pointer pr-4"
                      >
                        Xóa
                      </span>
                    </div>
                  )}
              </span>
            </LinkStyled>
          ))}
        </PanelStyled>
      </Collapse>
    </div>
  );
};

export default GroupMemberList;
