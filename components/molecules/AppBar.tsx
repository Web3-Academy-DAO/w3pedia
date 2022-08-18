import { MenuIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import NetworkClient from "../services/NetworkClient";
import { useAppSelector } from "../services/Store";
import { useRouter } from "next/router";

const AppBar: FC = () => {
  const Router = useRouter()
  const authenticated = useAppSelector(state => state.auth.authenticated)
  const { systemTheme, theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false)

  const toggleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark")
  }

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    return (hasMounted && currentTheme === "dark") ?
      <FaSun className="w-6 h-6 cursor-pointer" color="white" onClick={toggleTheme} /> :
      <BsMoonStarsFill className="w-6 h-6 cursor-pointer" color="white" onClick={toggleTheme} />
  };

  const onLogin = () => {
    NetworkClient.makeLogin("philip", "philip123")
  }

  const onLogout = () => {
    NetworkClient.makeLogout()
  }

  const onTest = () => {
    NetworkClient.makeGet("/api/forms", {}, 0, 1, (resp) => {
    })
  }

  const onTestError = () => {
    NetworkClient.makeGet("/api/forms/1", {}, 0, 1, (resp) => {
      console.log(resp)
    })
  }

  useEffect(() => {
    setHasMounted(true)
  }, []);

  return (<header className="bg-black">
    <nav className="flex items-center bg-[#343038] pl-6 py-3 text-white">
      <div className="text-3xl font-semibold">
        <span className="cursor-pointer" onClick={() => Router.push("/")}>W3pedia</span>
      </div>
      <ul className="hidden sm:flex flex-1 justify-end items-center gap-8 font-semibold text-lg px-2">
        <li className="cursor-pointer" onClick={() => Router.push("tools")}>Tools</li>
        <li className="cursor-pointer">Blogs</li>
        <li className="cursor-pointer">Discussion</li>
        <li>
          {hasMounted && (renderThemeChanger())}
        </li>
        <li><div className="border-r-2">&nbsp;</div></li>
        {!authenticated && <li className="cursor-pointer">
          <button onClick={onLogin}>Login</button>
        </li>}
        {!authenticated && <li>
          <button className="primary hover:bg-violet-800">Sign Up</button>
        </li>}
        {authenticated && <li>
          <button className="primary hover:bg-violet-800" onClick={onLogout}>Logout</button>
        </li>}
        {authenticated && (
          <>
            <li>
              <button className="primary hover:bg-violet-800" onClick={onTest}>Test</button>
            </li>
            <li>
              <button className="primary hover:bg-violet-800" onClick={onTestError}>Test Error</button>
            </li>
          </>
        )}
      </ul>
      <ul className="flex flex-1 justify-end px-2 sm:hidden">
        <li>
          <MenuIcon className="h-8 w-8 text-white" />
        </li>
      </ul>
    </nav>
  </header>)
}

export default AppBar;