import React, { useEffect, useState } from "react";
import { Avatar, Form, Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import useConversation from "../zustand/useConversation";
import {
  apiGetList,
  apiGetListFriend,
  apiGetRequestAddFriends,
  apiGetRequestAddFriendsMe,
  apiRequestAddFriends,
} from "../apis";
import { useSelector } from "react-redux";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(
        value,
        props.curFriend,
        props.cur,
        props.senderIds,
        props.reciverIds
      ).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, props.senderIds, props.reciverIds]);

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

async function fetchUserList(search, curFriend, cur, senderIds, reciverIds) {
  console.log("senderIdssenderIds: ", senderIds);
  const response = await apiGetList();
  console.log("response", response);
  const res = response.users
    .filter((user) => user.keywords.includes(search))
    .slice(0, 20)
    .map((user) => ({
      label: user.name,
      value: user._id,
      avatar: user.avatar,
    }))
    .filter((opt) => !curFriend.includes(opt.value))
    .filter((opt) => opt.value !== cur._id)
    .filter((opt) => !senderIds.includes(opt.value))
    .filter((opt) => !reciverIds.includes(opt.value));
  console.log("res", res);
  return res;
  // return response.where('keywords', 'array-contains', search).orderBy('name').limit(20).get().then(snapshot =>{
  //     return snapshot.docs.map(doc =>({
  //         label: doc.data().name,
  //         value: doc.data()._id,
  //         avatar: doc.data().avatar
  //     }))
  // })
}

const AddFriend = () => {
  const [form] = Form.useForm();
  const { selectedAddFriend, setSelectedAddFriend } = useConversation();
  const { current } = useSelector((state) => state.user);
  const [value, setValue] = useState([]);

  const [requestAddFriends, setRequestAddFriends] = useState([]);

  const [requestAddFriendsMe, setRequestAddFriendsMe] = useState([]);

  const [listFriend, setlistFriend] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetRequestAddFriends();
        const responseMe = await apiGetRequestAddFriendsMe();
        setRequestAddFriends(response);
        setRequestAddFriendsMe(responseMe);
      } catch (error) {
        console.error("Error fetching request add friends:", error);
      }
    };

    fetchData();
  }, [selectedAddFriend]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const friend = await apiGetListFriend();
        setlistFriend(friend.friendList);
      } catch (error) {
        console.error("Error fetching request add friends:", error);
      }
    };

    fetchData();
  }, [selectedAddFriend]);

  console.log("requestAddFriends", requestAddFriends);
  console.log("requestAddFriends Me", requestAddFriendsMe);

  const senderIds = requestAddFriends.map((request) => request.senderId);
  const reciverIds = requestAddFriendsMe.map((request) => request.reciverId);

  console.log(senderIds); // In ra mảng các senderId
  console.log("reciverIds", reciverIds);

  const handleOk = async () => {
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0].key !== undefined
    ) {
      const response = await apiRequestAddFriends(value[0].key);
    }

    setSelectedAddFriend(false);
  };

  const handleCancel = () => {
    setSelectedAddFriend(false);
  };
  // console.log("value: ", value[0]?.key);
  //   console.log("current", current?.friendList);

  return (
    <div>
      <Modal
        title="Thêm bạn bè"
        visible={selectedAddFriend}
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
            curFriend={listFriend}
            cur={current}
            senderIds={senderIds}
            reciverIds={reciverIds}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default AddFriend;
