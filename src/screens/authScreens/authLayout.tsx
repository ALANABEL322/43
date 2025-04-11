import type { ReactNode } from "react";
import imgAuth from "@/assets/autImag.png";
interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#FFFFFF] p-6 md:p-10">
        <div className="w-full max-w-md">{children}</div>
      </div>

      <div className="w-full md:w-1/2 flex bg-white">
        <img
          src={imgAuth}
          alt="Collaboration illustration"
          className="w-full h-[58rem]  object-cover"
        />
      </div>
    </div>
  );
}
