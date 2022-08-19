import Link from "next/link";
import { useState } from "react";
import NetworkClient from "../components/services/NetworkClient";
import { MainLayout } from "../components/layouts";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    NetworkClient.makeLogin(username, password);
  };

  return (
    <div>
      <div className="text-white w-full h-screen flex flex-col justify-center items-center">
        <div className="bg-[#343038] flex flex-col items-center justify-center w-fit p-10 rounded-md">
          <p className="text-2xl pb-6">Login using your account</p>
          <label className="p-6 flex flex-col items-center">
            <p className="pb-2">Username</p>
            <input
              className="rounded-md bg-[#1C1A1F] p-2"
              type="text"
              onChange={(chng) => {
                // console.log(chng.target.value)
                setUsername(chng.target.value);
              }}
            />
          </label>
          <label className="pb-6 flex flex-col items-center">
            <p className="pb-2">Password</p>
            <input
              className="rounded-md bg-[#1C1A1F] p-2"
              type="password"
              onChange={(chng) => {
                setPassword(chng.target.value);
              }}
            />
          </label>
          <div className="pb-6">
            <button type="submit" className="primary" onClick={onLogin}>
              Login
            </button>
          </div>

          {/* <p className="pb-5">--------- or sign in with --------</p> */}
          <p>
            {"Don't have an account yet?"} <Link href="/signIn">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.layout = MainLayout;

export default Login;
