import React, { useCallback, useState } from "react";
import "./Login.css"; // Import file CSS
import { InputField, Button } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { register } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAuthUser } = useAuthContext();
  // const location = useLocation()
  const [isForgotPassword, setisForgotPassword] = useState(false);

  const [payload, setpayload] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [isRegister, setisRegister] = useState(false);
  const resetPayload = () => {
    setpayload({
      username: "",
      password: "",
      name: "",
    });
  };

  const [username, setUsername] = useState("");
  const handleForgotPassWord = async () => {
    const response = await apiForgotPassword({ username });
    if (response.success) {
      toast.success(response.mes);
    } else {
      toast.info(response.mes);
    }
  };

  const handleSubmit = useCallback(async () => {
    const { name, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      if (response.success) {
        Swal.fire("Xác thực tài khoản", response.mes, "success").then(() => {
          setisRegister(false);
          resetPayload();
        });
      } else {
        Swal.fire("Đăng ký không thành công", response.mes, "error");
      }
    } else {
      const rs = await apiLogin(data);

      // navigate(`/${path.HOME}`)
      if (rs.success) {
        dispatch(
          register({
            isLoggedIn: true,
            token: rs.accessToken,
            userData: rs.userData,
          })
        );
        setAuthUser(rs.userData);
        navigate(`/${path.HOME}`);
      } else {
        Swal.fire("Đăng nhập không thành công", rs.mes, "error");
      }
    }

    // console.log(payload);
  }, [payload, isRegister]);

  return (
    <div className="login-container inline-flex ">
      {isForgotPassword && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-white items-center flex flex-col z-10">
          <div className="text-[50px] p-10 font-bold">
            Cập nhật lại mật khẩu
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="usename">
              Nhập email để cập nhật lại mật khẩu:{" "}
            </label>
            <input
              type="text"
              id="usename"
              className="w-[800px]  pb-2 border-b outline-none"
              placeholder="Exp: email@gmail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4 flex gap-4">
            <Button name="Xác nhận" handleOnClick={handleForgotPassWord} />

            <Button
              name="Trở về"
              handleOnClick={() => setisForgotPassword(false)}
            />
          </div>
        </div>
      )}
      <div className="form-container flex-col flex  items-center ">
        <h1 className="text-[28px] content-center text-sky-400">
          {isRegister ? "Đăng ký" : "Đăng nhập"}
        </h1>
        <div className="form-content">
          {isRegister && (
            <InputField
              value={payload.name}
              setValue={setpayload}
              nameKey="name"
            />
          )}

          <InputField
            value={payload.username}
            setValue={setpayload}
            nameKey="username"
          />
          <InputField
            value={payload.password}
            setValue={setpayload}
            nameKey="password"
            type="password"
          />
          <Button
            name={isRegister ? "Đăng ký" : "Đăng nhập"}
            handleOnClick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between my-4 w-full text-sm">
            {!isRegister && (
              <span
                className="text-sky-400 hover:underline cursor-pointer"
                onClick={() => setisRegister(true)}
              >
                Đăng ký tài khoản
              </span>
            )}
            {isRegister && (
              <span
                className="text-sky-400 hover:underline cursor-pointer w-full"
                onClick={() => setisRegister(false)}
              >
                Đăng nhập
              </span>
            )}

            {!isRegister && (
              <span
                onClick={() => setisForgotPassword(true)}
                className="text-sky-400 hover:underline cursor-pointer"
              >
                Quên mật khẩu?
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
