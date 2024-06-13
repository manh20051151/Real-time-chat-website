import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../store/user/asyncActions";
import { extractTime } from "../ultils/extractTime";
import useDeleteMessage from "../hooks/useDeleteMessage";
import avatarTam from "../assets/anhtam.png";
import { apiDeleteMessageGr, apiGetUserById } from "../apis";

const Message = ({ message, avatar }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState("");
  const [sender, setSender] = useState("");

  // console.log("currentUser: ", currentUser);

  const { deleting, deleteMessage } = useDeleteMessage();

  // console.log("message:message:message:", message);
  // console.log("idgr: ",message.senderId);
  // const response = await apiGetUserById(message.senderId)
  // console.log("response gr: ",response);

  useEffect(() => {
    if (message.senderId) {
      apiGetUserById(message.senderId)
        .then((response) => {
          setSender(response);
        })
        .catch((error) => {
          console.error("Error fetching user by id:", error);
        });
    }
  }, [message.senderId]);
  // console.log("tma", sender);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) {
        dispatch(getCurrent());
      }
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    setCurrentUser(current?._id);
  }, [current]);

  // const currentUser = "660f90b2a966740eff1bdb28"
  const fromMe = message.senderId === currentUser;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const col = fromMe ? "bg-blue-500" : "";

  const a1 = current?.avatar || avatarTam;
  const a2 = sender?.user?.avatar || avatarTam;
  const nameSender = sender?.user?.name;
  const avatarMes = fromMe ? a1 : a2;
  const formattedTime = extractTime(message.createdAt);
  const handleSubmit = async () => {
    await deleteMessage(message._id);
    await apiDeleteMessageGr(message._id);
    console.log("message._id", message._id);
  };

  console.log("imageeee:", message);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-14 rounded-full">
          <img src={avatarMes} alt="logo" className="w-16 h-16 object-cover" />
        </div>
      </div>
      <div>
        <div> {!fromMe && <span> {nameSender} </span>}</div>
        <div className={`chat-bubble text-white pb-2 ${col}`}>
          {message.message}
          {message.image && (
            <img
              src={message.image}
              width="500px"
              height="400px"
              alt="Message Image"
            />
          )}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}

          {fromMe && !deleting && (
            <div onClick={handleSubmit} className="hover:cursor-pointer">
              xóa
            </div>
          )}
          {fromMe && deleting && (
            <div className="loading loading-spinner"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
