import { useMemo, useState } from "react";
import NetworkClient from "../components/services/NetworkClient";
import { MainLayout } from "../components/layouts";
import { Button } from "../components/atoms";
import { useRouter } from "next/router";
import { useAppDispatch } from "../components/services/Store";
import { showError } from "../components/services/ErrorModalSlice";

const Login = () => {
  const Router = useRouter()
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formReady, setFormReady] = useState(false)

  const onLogin = () => {
    NetworkClient.makeLogin(username, password, (resp) => {
      Router.push("/")
    }, (error) => {
      dispatch(showError({ message: error.message }))
    })
  };

  useMemo(() => {
    if (username.length > 0 && password.length > 0) {
      setFormReady(true)
    } else {
      setFormReady(false)
    }
  }, [username, password])

  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:w-1/2 py-12 px-10 gap-5 rounded-lg mx-auto my-5 md:my-14 bg-[#343038] text-white">
        <h1 className="text-2xl pb-4">Login with your account</h1>
        <p className="">Username</p>
        <input className="rounded-md bg-[#1C1A1F] px-4 py-2" type="text" autoComplete="current-username" onChange={(e) => setUsername(e.target.value)} />
        <p className="">Password</p>
        <input className="rounded-md bg-[#1C1A1F] px-4 py-2" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
        <div className="flex mt-5">
          <Button type="primary" className="w-1/2 ml-auto" disabled={!formReady} onClick={onLogin}>Login</Button>
        </div>
        <div className="text-sm text-right">
          <span className="cursor-pointer text-gray-200 hover:text-white" onClick={() => Router.push("/register")}>
            Don&apos;t have an account? Sign up now.
          </span>
        </div>
      </div>
    </div>
  );
};

Login.layout = MainLayout;

export default Login;
