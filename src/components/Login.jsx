import { baseUrl } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "./Loading";
import Cookies from "js-cookie";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, data);
      if (res.data.success) {
        toast.success(res.data.message);       
        const token = res.data.body.token;
        console.log(token);
        localStorage.setItem('token', token)
        Cookies.set('token', token);
        router.push("/dashboard");
        setLoading(false);
      } else {
        toast.error("Error: " + res.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Login
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white dark:text-zinc-900 font-semibold rounded-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
