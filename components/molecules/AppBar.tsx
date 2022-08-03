import { MenuIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

const AppBar: FC = () => {
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

  useEffect(() => {
    setHasMounted(true)
  }, []);

  return (<header className="bg-black">
    <nav className="flex items-center bg-[#343038] pl-6 py-3 text-white">
      <div className="text-3xl font-semibold">W3pedia</div>
      <ul className="hidden sm:flex flex-1 justify-end items-center gap-8 font-semibold text-lg px-2">
        <li className="cursor-pointer">Tools</li>
        <li className="cursor-pointer">Blogs</li>
        <li className="cursor-pointer">Discussion</li>
        <li>
          {hasMounted && (renderThemeChanger())}
        </li>
        <li><div className="border-r-2">&nbsp;</div></li>
        <li className="cursor-pointer">Login</li>
        <li>
          <button className="primary hover:bg-violet-800">Sign Up</button>
        </li>
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