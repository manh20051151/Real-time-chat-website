import React, { useState } from "react";
import SearchInput from "./SearchInput";
import useConversation from "../zustand/useConversation";
import { apiCreateGroup } from "../apis";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import Button from "./Button";

const SearchBar = () => {
  const {
    selectedAddFriend,
    setSelectedAddFriend,
    ismodel,
    setIsmodel,
    setGroups,
  } = useConversation();
  // const [ismodel, setIsmodel] = useState(false);
  const [nameGroup, setNameGroup] = useState("");
  const { authUser } = useAuthContext();
  const userId = authUser._id;

  const handleCreateGroup = async () => {
    const response = await apiCreateGroup({ nameGroup, userId });
    if (response.success) {
      toast.success(response.mes);
      setGroups((prevGroups) => {
        const newGroups = [...prevGroups.groups, response.group]; // Thêm nhóm mới vào danh sách nhóm hiện tại
        return { ...prevGroups, groups: newGroups };
      });
      setIsmodel(false);
    } else {
      toast.info(response.mes);
    }
  };
  const handleAddFriend = () => {
    setSelectedAddFriend(true);
  };

  const Addfriend = ({ children }) => {
    return <div className="add-friend">{children}</div>;
  };
  const Creategroup = ({ children }) => {
    return <div className="create-group">{children}</div>;
  };
  return (
    <div>
      {ismodel && (
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
            <Button name="Xác nhận" handleOnClick={handleCreateGroup} />

            <Button name="Trở về" handleOnClick={() => setIsmodel(false)} />
          </div>
        </div>
      )}
      <div className="search-bar">
        {/* <img
              src={"https://www.svgrepo.com/show/522443/search.svg"}
              width="25px"
              height="25px"
              alt=""
            />
            <input className="timkiem" type="text" placeholder="Tìm kiếm" /> */}
        <SearchInput />
        <Addfriend>
          <img
            className="add"
            src={"https://www.svgrepo.com/show/440013/person-plus.svg"}
            alt=""
            onClick={handleAddFriend}
          />
        </Addfriend>
        <Creategroup>
          <img
            className="add"
            src={"https://www.svgrepo.com/show/458218/group-add.svg"}
            alt=""
            onClick={() => setIsmodel(true)}
          />
        </Creategroup>
      </div>

      <div
        style={{ marginTop: 10, marginLeft: 20, marginBottom: 10 }}
        className="filter-options"
      >
        <span className="text">Tất cả</span>
        <span className="text">Chưa đọc</span>
      </div>
    </div>
  );
};

export default SearchBar;
