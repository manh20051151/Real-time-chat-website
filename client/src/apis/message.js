import axios from "../axios";

export const apiSendMesage = (message, id)=> axios({
    url: `/message/send/${id}`,
    method: 'post',
    data: message,
})
export const apiGetMessage = (id)=> axios({
    url: `/message/${id}`,
    method: 'get',
})
export const apiDeleteMessage = (id)=> axios({
    url: `/message/deleteMessage/${id}`,
    method: 'delete',
})

export const apiSendMesageImage = (image, id) => {
    return axios({
      url: `/message/sendImage/${id}`,
      method: 'post',
      data: image,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

