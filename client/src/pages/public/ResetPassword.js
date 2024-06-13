import React, { useState } from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";

const ResetPassword = () => {
  const [password, setpassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  console.log(token);

  const handleResetPassWord = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      toast.success(response.mes);
      navigate(`/${path.LOGIN}`);
    } else {
      toast.info(response.mes);
    }
  };
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-white items-center flex flex-col">
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Nhập password: </label>
        <input
          type="password"
          id="password"
          className="w-[800px]  pb-2 border-b outline-none"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <div className="mt-4 flex gap-4">
        <Button name="Xác nhận" handleOnClick={handleResetPassWord} />
      </div>
    </div>
  );
};

export default ResetPassword;
