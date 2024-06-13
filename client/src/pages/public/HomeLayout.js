import React from "react";
import "./Home.css";
import MessageContainer from "../../components/MessageContainer";
import Conversations from "../../components/Conversations";
import GroupList from "../../components/GroupList";
import SearchBar from "../../components/SearchBar";
import AddFriend from "../../components/AddFriend";
import AddMember from "../../components/AddMember";
import AddDeputy from "../../components/AddDeputy";
import UpdateLeader from "../../components/UpdateLeader";

const TopMiddle = () => {
  return (
    <div className="top-middle">
      <SearchBar />
    </div>
  );
};

const BottomMiddle = () => {
  return (
    <div className="bottom-middle">
      <div
        id="tren"
        className="half"
        style={{ height: "380px", overflowY: "auto" }}
      >
        <Conversations />
      </div>
      <div style={{ fontSize: "20px" }}>Nhóm</div>
      <div
        id="duoi"
        className="half"
        style={{ height: "380px", overflowY: "auto" }}
      >
        <GroupList />
      </div>
    </div>
  );
};
const HomeLayout = () => {
  const MiddleContent = () => {
    return (
      <div className="middle-content">
        <TopMiddle />
        <BottomMiddle />
      </div>
    );
  };

  const RightContent = () => {
    return (
      <div
        className=" right-content flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding
          backdrop-filter backdrop-blur-lg bg-opacity-0"
      >
        <MessageContainer />
      </div>
    );
  };

  return (
    <div className=" containerr">
      <AddFriend />
      <AddMember />
      <AddDeputy />
      <UpdateLeader />
      <MiddleContent />
      <RightContent />
    </div>
  );
};

export default HomeLayout;
