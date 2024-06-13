import React, { useEffect, useState } from "react";
import { Avatar, Form, Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import useConversation from "../zustand/useConversation";
import {
  apiGetGroup,
  apiGetList,
  apiGetListFriend,
  apiGetRequestAddFriends,
  apiGetRequestAddFriendsMe,
  apiGetUserById,
  apiRequestAddFriends,
  apiUpdateMember,
} from "../apis";
import { useSelector } from "react-redux";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.curMember, props.cur, props.memberId).then(
        (newOptions) => {
          setOptions(newOptions);
          setFetching(false);
        }
      );
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.avatar}>
            {opt.avatar ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMember, cur, memberId) {
  // const response = await apiGetList();
  // const responsee = await apiGetGroup(memberId);
  const friend = await apiGetListFriend();
  const sendersInfo = await Promise.all(
    friend.friendList.map((senderId) => apiGetUserById(senderId))
  );

  const transformedData = {
    success: true,
    users: sendersInfo.map((item) => {
      const { user } = item;
      // Loại bỏ các trường không cần thiết
      const { ...userWithoutSensitiveInfo } = user;
      return userWithoutSensitiveInfo;
    }),
  };
  const res = transformedData.users
    .filter((user) => user.keywords.includes(search))
    .slice(0, 20)
    .map((user) => ({
      label: user.name,
      value: user._id,
      avatar: user.avatar,
    }))
    .filter((opt) => !curMember.includes(opt.value))
    .filter((opt) => opt.value !== cur._id);
  // .filter(opt => !senderIds.includes(opt.value))
  // .filter(opt => !reciverIds.includes(opt.value))
  console.log("res", res);
  return res;
}

const AddMember = () => {
  const [form] = Form.useForm();
  const { selectedAddMember, setSelectedAddMember, selectedConversation } =
    useConversation();
  const { current } = useSelector((state) => state.user);
  const [value, setValue] = useState([]);

  const [members, setGroupMember] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsee = await apiGetGroup(selectedConversation?._id);

        setGroupMember(responsee.group.participants);
      } catch (error) {
        console.error("Error fetching request add friends:", error);
      }
    };

    fetchData();
  }, [selectedConversation]);

  const handleOk = async () => {
    const response = await apiUpdateMember(
      selectedConversation._id,
      value[0].key
    );
    console.log("value: ", value[0]?.key);
    setSelectedAddMember(false);
  };

  const handleCancel = () => {
    setSelectedAddMember(false);
  };
  console.log("value: ", value[0]?.key);
  //   console.log("current", current?.friendList);

  return (
    <div>
      <Modal
        title="Thêm thành viên"
        visible={selectedAddMember}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="h-[100px]" form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            Label="Tên các người dùng"
            value={value}
            placeholder="Nhập tên người dùng"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curMember={members}
            cur={current}
            memberId={selectedConversation?._id}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default AddMember;
