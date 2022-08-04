import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaSun } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";

import { Button, NavListItem } from "../atoms";

export const NavBar: NextPage = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setmounted] = useState(false);

  const navTabs = [
    {
      route: "/",
      label: "Tools",
    },
    {
      route: "/",
      label: "Blog",
    },
    {
      route: "/",
      label: "Discounts",
    },
  ];

  const renderThemeChanger = () => {
    if (!mounted) {
      return null;
    }
    const currentTheme = theme === "system" ? systemTheme : theme;
    // console.log(currentTheme);

    if (currentTheme === "dark") {
      // console.log("here");
      return <FaSun className="w-6 h-6" color="white" />;
    } else {
      // console.log("here");
      return <BsMoonStarsFill className="w-6 h-6" color="white" />;
    }
  };

  useEffect(() => {
    // console.log("useffect");
    setmounted(true);
  }, []);

  return (
    <div>
      <div className="bg-[#343038] shadow-lg flex flex-row justify-between items-center">
        <title>Web3Pedia</title>

        <Link href="/">
          <a className="text-white font-thin text-2xl ml-[25px]">
            <span className="font-medium">Web3</span>pedia
          </a>
        </Link>

        <ol className="flex items-center">
          {navTabs.map((tab, index) => {
            return (
              <NavListItem key={index}>
                <Link href={tab.route}>
                  <Button className="text-white h-full" type="nav">
                    {tab.label}
                  </Button>
                </Link>
              </NavListItem>
            );
          })}
          <NavListItem>
            <Button
              type="nav"
              onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              {renderThemeChanger()}
            </Button>
          </NavListItem>
          <div className="border-[1px] h-6 border-white mx-3 my-[10px]"></div>
          <NavListItem>
            <Link href="/">
              <Button type="nav">Login</Button>
            </Link>
          </NavListItem>
          <NavListItem className="my-2 mr-3">
            <Link href="/">
              <Button type="primary">Sign Up</Button>
            </Link>
          </NavListItem>
        </ol>
      </div>
    </div>
  );
};
