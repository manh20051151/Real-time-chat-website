import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ButtonForm, InputForm } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import avatar from "../../assets/anhtam.png";
import { apiUpdateCurrent } from "../../apis";
import { getCurrent } from "../../store/user/asyncActions";
import { toast } from "react-toastify";
import { useSocketContext } from "../../context/SocketContext";
import { logout } from "../../store/user/userSlice";

const Personal = () => {
  const { current } = useSelector((state) => state.user);
  const dispath = useDispatch();
  const { socket } = useSocketContext();
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("SocketdeleteUser", async () => {
      dispatch(logout());
      window.location.href = `/`;
    });
    return () => socket?.off("SocketdeleteUser");
  }, [socket]);

  useEffect(() => {
    const handleSocketUpdate = async () => {
      dispath(getCurrent());
    };

    socket?.on("SocketupdateUserByAdmin", handleSocketUpdate);

    return () => {
      socket?.off("SocketupdateUserByAdmin", handleSocketUpdate);
    };
  }, [socket, dispath]);

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      name: current?.name,
      username: current?.username,
      avatar: current?.avatar,
    });
  }, [current, socket]);

  const handleUpdateInfor = async (data) => {
    const formData = new FormData();

    if (data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    delete data.avatar;
    for (let i of Object.entries(data)) {
      formData.append(i[0], i[1]);
    }

    const response = await apiUpdateCurrent(formData);
    if (response.success) {
      dispath(getCurrent());
      toast.success(response.mes);
    } else {
      toast.error(response.mes);
    }
  };

  return (
    <div className="w-full relative px-4 ">
      <header className="text-3xl font-semibold py-4 border-b border-b-blue-200">
        Presonal
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateInfor)}
        className="w-3/5 mx-auto py-8 flex-col gap-4"
      >
        <InputForm
          label="name"
          register={register}
          errors={errors}
          id={"name"}
          validate={{ required: "Require fill" }}
        />
        <InputForm
          label="username"
          register={register}
          errors={errors}
          id={"username"}
          validate={{
            required: "Require fill",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          }}
        />
        <div className="flex items-center gap-2 py-4">
          <span className="font-medium">Account status:</span>
          <span> {current?.isBlocked ? "Blocked" : "Active"} </span>
        </div>
        <div className="flex items-center gap-2 py-2">
          <span className="font-medium">Role:</span>
          <span> {+current?.role === 1 ? "Admin" : "User"} </span>
        </div>
        <div className="flex items-center gap-2 py-2">
          <span className="font-medium">Created At:</span>
          <span> {moment(current?.createdAt).fromNow()} </span>
        </div>
        <div className="flex flex-col gap-2 py-2">
          <span className="font-medium">Profile image:</span>
          <label htmlFor="file">
            <img
              src={current?.avatar || avatar}
              alt="avatar"
              className="ml-8 h-20 w-20 object-cover rounded-full"
            />
          </label>
          <input type="file" id="file" {...register("avatar")} hidden />
        </div>
        {isDirty && (
          <div className="w-full flex justify-end">
            <ButtonForm type="submt">Cập nhật thông tin</ButtonForm>
          </div>
        )}
      </form>
    </div>
  );
};

export default Personal;
