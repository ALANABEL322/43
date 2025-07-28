import { Outlet } from "react-router-dom";
import imgAuth from "@/assets/autImag.png";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center bg-white p-6 md:p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#ffffff] p-6 md:p-4">
        <div className="max-w-md">
          <img
            src={imgAuth}
            alt="Ilustración de colaboración"
            className="h-auto w-full rounded-lg shadow-lg border-2 border-gray-200 p-2 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
