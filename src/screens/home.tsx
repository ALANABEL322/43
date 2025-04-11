import { Link } from "react-router-dom";
import imgAuth from "@/assets/imgAuth.png";
import { paths } from '@/routes/paths';

export default function Home() {
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

      <div className="flex flex-1 flex-col items-center justify-center bg-[#e84c3d] p-6 md:p-10 text-white">
        <div className="w-full max-w-md space-y-8 text-center">
          <h1 className="text-4xl font-bold">Welcome to Our App</h1>
          <p className="text-lg">Sign in to your account or create a new one to get started</p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              to={paths.auth.login}
              className="flex-1 rounded-md bg-white px-6 py-3 font-medium text-[#e84c3d] shadow-lg hover:bg-gray-100 text-center"
            >
              Login
            </Link>
            <Link
              to={paths.auth.register}
              className="flex-1 rounded-md border-2 border-white px-6 py-3 font-medium text-white hover:bg-white/10 text-center"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}