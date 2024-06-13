import React, { useState } from "react";
import { BsSend, BsCardImage } from "react-icons/bs";
import useSendMessage from "../hooks/useSendMessage";
import useSendMessageImage from "../hooks/useSendMessageImage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { loadingg, sendMessageImage } = useSendMessageImage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    await sendMessage(message);
    setMessage("");
  };

  // Hàm xử lý khi click vào icon
  const handleImageClick = () => {
    document.getElementById("image").click();
  };

  //18-04

  // const[grapbPhoto, setGrapbPhoto] = useState(false)

  const photoPicker = async (e) => {
    e.preventDefault();
    console.log(e.target.files);
    try {
      const file = e.target.files[0];
      console.log("file", file);
      console.log("e.target.files", e.target.files);
      const formData = new FormData();
      formData.append("image", file);
      console.log("formData:", formData);
      await sendMessageImage(formData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-blue-500 border-b-gray-600 text-black"
          placeholder="Nhập tin nhắn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* <input type="file" name="image" id="image" accept="image/*" /> */}
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={photoPicker}
        />
        {/* Icon BsCardImage */}
        <button
          type="button"
          className="absolute inset-y-0 end-10 flex items-center pe-3"
          onClick={handleImageClick}
        >
          <BsCardImage />
        </button>

        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend className="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
