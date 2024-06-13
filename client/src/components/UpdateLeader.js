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
  apiUpdateDeputy,
  apiUpdateLeader,
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

      fetchOptions(value, props.cur, props.groupId).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
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

async function fetchUserList(search, cur, groupId) {
  const responsee = await apiGetGroup(groupId);
  const sendersInfo = await Promise.all(
    responsee.group.participants.map((senderId) => apiGetUserById(senderId))
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
    .filter((opt) => opt.value !== cur._id);
  // .filter(opt => !senderIds.includes(opt.value))
  // .filter(opt => !reciverIds.includes(opt.value))
  return res;
}

const UpdateLeader = () => {
  const [form] = Form.useForm();
  const {
    selectedUpdateLeader,
    setSelectedUpdateLeader,
    selectedConversation,
  } = useConversation();
  const { current } = useSelector((state) => state.user);
  const [value, setValue] = useState([]);

  const handleOk = async () => {
    const response = await apiUpdateLeader(
      selectedConversation._id,
      value[0].key
    );
    console.log("value: ", value[0]?.key);
    setSelectedUpdateLeader(false);
  };

  const handleCancel = () => {
    setSelectedUpdateLeader(false);
  };
  console.log("value: ", value[0]?.key);
  //   console.log("current", current?.friendList);
  return (
    <div>
      <Modal
        title="Chuyển trưởng nhóm"
        visible={selectedUpdateLeader}
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
            // curMember={members}
            cur={current}
            groupId={selectedConversation?._id}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateLeader;
