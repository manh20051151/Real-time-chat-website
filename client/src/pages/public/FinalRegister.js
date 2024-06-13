import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import Swal from "sweetalert2";
const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "failed") {
      Swal.fire("Lỗi", "Đăng ký không thành công", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
    if (status === "sussess") {
      Swal.fire("Hoàn thành", "Đăng ký thành công", "success").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    }
  }, []);
  return <div className="h-screen w-screen bg-blue-500"></div>;
};

export default FinalRegister;
