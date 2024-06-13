import axios from "../axios";

export const apiCreateGroup = (data)=> axios({
    url: `/group/create`,
    method: 'post',
    data
})

export const apiGetListGroup = ()=> axios({
    url: '/group',
    method: 'get',
})

export const apiSendMesageGroup = (message, id)=> axios({
    url: `/group/send/${id}`,
    method: 'post',
    data: message,
})
export const apiGetMessageGroup = (id)=> axios({
    url: `/group/${id}`,
    method: 'get',
})

export const apiSendMesageImageGr = (image, id) => {
    return axios({
      url: `/group/sendImage/${id}`,
      method: 'post',
      data: image,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

export const apiDeleteMessageGr = (id)=> axios({
    url: `/group/deleteMessage/${id}`,
    method: 'delete',
})

export const apiGetGroup = (id)=> axios({
  url: `/group/getGroup/${id}`,
  method: 'get',
})

export const apiUpdateMember = (id, memberId)=> axios({
  url: `/group/updateMember/${id}`,
  method: 'post',
  data:{ memberId },
})

export const apiUpdateDeputy = (id, memberId)=> axios({
  url: `/group/updateDeputy/${id}`,
  method: 'post',
  data:{ memberId },
})

export const apiUpdateLeader = (id, memberId)=> axios({
  url: `/group/updateLeader/${id}`,
  method: 'post',
  data:{ memberId },
})

export const apiOutGroup = (id)=> axios({
  url: `/group/outGroup/${id}`,
  method: 'post',
})

export const apiDeleteGroup = (id)=> axios({
  url: `/group/deleteGroup/${id}`,
  method: 'delete',
})

export const apiDeleteMember = (id, memberId)=> axios({
  url: `/group/deleteMember/${id}`,
  method: 'post',
  data:{ memberId },
})
export const apiDeleteDeputy = (id, memberId)=> axios({
  url: `/group/deleteDeputy/${id}`,
  method: 'post',
  data:{ memberId },
})

export const apiUpdateNameGroup = (id, nameGroup)=> axios({
  url: `/group/updateNameGroup/${id}`,
  method: 'post',
  data:{ nameGroup },
})

export const apiUpdateAvtarGroup = (avatarGroup, id) => axios({
    url: `/group/updateAvatarGroup/${id}`,
    method: 'post',
    data: avatarGroup,
    headers: {
      "Content-Type": "multipart/form-data",
    }
})
