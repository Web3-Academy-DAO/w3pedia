import { MenuIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import NetworkClient from "../services/NetworkClient";
import { useAppSelector } from "../services/Store";
import { useRouter } from "next/router";
import { Button } from "../atoms";

export const AppBar: FC = () => {
  const Router = useRouter();
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const { systemTheme, theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  const toggleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    return hasMounted && currentTheme === "dark" ? (
      <FaSun
        className="w-6 h-6 cursor-pointer"
        color="white"
        onClick={toggleTheme}
      />
    ) : (
      <BsMoonStarsFill
        className="w-6 h-6 cursor-pointer"
        color="white"
        onClick={toggleTheme}
      />
    );
  };

  const onLogin = () => {
    NetworkClient.makeLogin("philip", "philip123");
  };

  const onLogout = () => {
    NetworkClient.makeLogout();
    Router.push("/")
  };

  const onSubmitNewTool = () => {
    Router.push("submission")
  };

  const onTestError = () => {
    NetworkClient.makeGet("/api/forms/1", {}, 0, 1, (resp) => {
      console.log(resp);
    });
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <header className="bg-black">
      <nav className="flex items-center bg-[#343038] pl-6 py-3 text-white">
        <div className="text-3xl font-semibold">
          <span className="cursor-pointer" onClick={() => Router.push("/")}>
            W3pedia
          </span>
        </div>
        <ul className="hidden sm:flex flex-1 justify-end items-center gap-4 font-semibold text-lg px-2">
          <li>{hasMounted && renderThemeChanger()}</li>
          <li>
            <div className="border-r-2">&nbsp;</div>
          </li>
          {!authenticated && (
            <li className="cursor-pointer">
              <Button type="primary" className="w-32" onClick={onLogin}>Login</Button>
            </li>
          )}
          {!authenticated && (
            <li>
              <Button type="secondary" className="w-32">Sign Up</Button>
            </li>
          )}
          {authenticated && (
            <li>
              <Button type="primary" className="min-w-32" onClick={onSubmitNewTool}>Submit New Tool</Button>
            </li>
          )}
          {authenticated && (
            <li>
              <Button type="secondary" className="w-32" onClick={onLogout}>Logout</Button>
            </li>
          )}
        </ul>
        <ul className="flex flex-1 justify-end px-2 sm:hidden">
          <li>
            <MenuIcon className="h-8 w-8 text-white" />
          </li>
        </ul>
      </nav>
    </header>
  );
};
