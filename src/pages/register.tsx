import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { Button } from "../components/atoms";
import { MainLayout } from "../components/layouts";
import { showError } from "../components/services/ErrorModalSlice";
import NetworkClient from "../components/services/NetworkClient";
import { useAppDispatch } from "../components/services/Store";

const Login = () => {
  const dispatch = useAppDispatch()
  const Router = useRouter()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const [formReady, setFormReady] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useMemo(() => {
    if (username.length > 0 && password.length > 0 && email.length > 0 && isEmail(email)) {
      setFormReady(true)
    } else {
      setFormReady(false)
    }
  }, [username, password, email])

  const onRegister = () => {
    setLoading(true)
    NetworkClient.makePost("/api/auth/local/register", {
      username: username,
      email: email,
      password: password,
    }, (resp) => {
      setSubmitted(true)
      setLoading(false)
    }, (error) => {
      dispatch(showError({ message: error.message }))
      setLoading(false)
    })
  }

  return (
    <div className="flex justify-center">
      <div className={`${submitted ? "flex" : "hidden"} container flex-col items-center gap-4 bg-[#343038] md:w-4/6 my-[10%] rounded-2xl text-white text-center px-4`}>
        <h1 className="pt-16 text-2xl">Thank You!</h1>
        <div className="pb-10 w-3/4">
          <p>Your new account has been created.</p>
          <p>You should receive a confirmation email soon.</p>
          <CheckCircleIcon className="w-16 h-16 fill-green-500 mx-auto m-5" />
        </div>
      </div>
      <div className={`${!submitted ? "flex" : "hidden"} flex flex-col md:w-1/2 py-12 px-10 gap-5 rounded-lg mx-auto my-5 md:my-14 bg-[#343038] text-white`}>
        <h1 className="text-2xl pb-4">Login with your account</h1>
        <p className="">Email</p>
        <input className="rounded-md bg-[#1C1A1F] px-4 py-2" type="text" autoComplete="current-email" onChange={(e) => setEmail(e.target.value)} />
        <p className="">Username</p>
        <input className="rounded-md bg-[#1C1A1F] px-4 py-2" type="text" autoComplete="current-username" onChange={(e) => setUsername(e.target.value)} />
        <p className="">Password</p>
        <input className="rounded-md bg-[#1C1A1F] px-4 py-2" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
        <div className="flex mt-5">
          <Button type="primary" className="w-1/2 ml-auto" disabled={!formReady || loading} onClick={onRegister}>Register</Button>
        </div>
        <div className="text-sm text-right">
          <span className="cursor-pointer text-gray-200 hover:text-white" onClick={() => Router.push("/login")}>
            Already have an account? Login up now.
          </span>
        </div>
      </div>
    </div>
  );
};

Login.layout = MainLayout;

export default Login;
