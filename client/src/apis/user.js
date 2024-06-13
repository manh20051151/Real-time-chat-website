import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });

export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });

export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data,
  });

export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data,
  });

export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  });

export const apiGetList = () =>
  axios({
    url: "/user/getUsers",
    method: "get",
  });
export const apiGetUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });

export const apiUpdateUser = (data, uid) =>
  axios({
    url: "/user/" + uid,
    method: "put",
    data,
  });

export const apiDeleteUser = (uid) =>
  axios({
    url: "/user/" + uid,
    method: "delete",
  });

export const apiUpdateCurrent = (data) =>
  axios({
    url: "/user/current",
    method: "put",
    data,
  });

export const apiGetUserById = (uid) =>
  axios({
    url: "/user/getUserById/" + uid,
    method: "get",
  });

export const apiRequestAddFriends = (id) =>
  axios({
    url: `/requestAddFriends/send/${id}`,
    method: "post",
  });

export const apiGetRequestAddFriends = () =>
  axios({
    url: "/requestAddFriends/",
    method: "get",
  });

export const apiUpdateRequestAddFriends = (id) =>
  axios({
    url: `/requestAddFriends/update/${id}`,
    method: "put",
  });
export const apiUpdateRequestAddFriendsCancel = (id) =>
  axios({
    url: `/requestAddFriends/updateCancel/${id}`,
    method: "put",
  });

export const apiUpdateListFriends = (id) =>
  axios({
    url: `/requestAddFriends/updateListFriend/${id}`,
    method: "put",
  });

export const apiUpdateListFriendsNew = (id) =>
  axios({
    url: `/requestAddFriends/updateListFriendNew/${id}`,
    method: "put",
  });

export const apiUpdateListFriendsNewFr = (id) =>
  axios({
    url: `/requestAddFriends/updateListFriendNewFr/${id}`,
    method: "put",
  });

export const apiGetRequestAddFriendsMe = () =>
  axios({
    url: "/requestAddFriends/requestAddFriendsMe",
    method: "get",
  });

export const apiDeleteRequestAddFriends = (id) =>
  axios({
    url: `/requestAddFriends/delete/${id}`,
    method: "delete",
  });

export const apiDeleteFriend = (id) =>
  axios({
    url: `/requestAddFriends/deleteFriend/${id}`,
    method: "delete",
  });

export const apiDeleteFriendFr = (id) =>
  axios({
    url: `/requestAddFriends/deleteFriendFr/${id}`,
    method: "delete",
  });

export const apiDeleteRequestAddFriendsCancel = (id) =>
  axios({
    url: `/requestAddFriends/deleteCancel/${id}`,
    method: "delete",
  });

export const apiGetListFriend = () =>
  axios({
    url: "/requestAddFriends/getListFriends",
    method: "get",
  });
