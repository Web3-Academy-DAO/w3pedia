import Link from "next/link";
import { useState } from "react";
import { MainLayout } from "../components/layouts";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registerInfo = {
    username: username,
    email: email,
    password: password,
  };

  // const onSignIn = () => {
  //     NetworkClient.makeSignIn(username, email, password)
  //   }
  const handleRegister = async () => {
    const register = await fetch("api/auth/local/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInfo),
    });

    const registerResponse = await register.json();
    console.log(registerResponse);
  };

  return (
    <div>
      <div className="text-white w-full h-screen flex flex-col justify-center items-center">
        <div className="bg-[#343038] flex flex-col items-center justify-center w-fit p-10 rounded-md">
          <p className="text-2xl pb-10">Sign up for an account</p>
          <label className="flex flex-col items-center">
            <p className="pb-2">Email</p>
            <input
              className="rounded-md bg-[#1C1A1F] p-2"
              type="email"
              onChange={(chng) => {
                setEmail(chng.target.value);
              }}
            />
          </label>

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
            <button type="submit" className="primary" onClick={handleRegister}>
              Sign In
            </button>
          </div>

          {/* <p className="pb-5">--------- or sign in with --------</p> */}
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.layout = MainLayout;

export default Login;
