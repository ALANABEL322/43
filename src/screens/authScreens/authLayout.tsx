import type { ReactNode } from "react"
import imgAuth from "@/assets/imgAuth.png"
interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center bg-white p-6 md:p-10">
        <div className="max-w-md">
          <img
            src={imgAuth}
            alt="Collaboration illustration"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#e84c3d] p-6 md:p-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
