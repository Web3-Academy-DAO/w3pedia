import Image from "next/image";
import { useState } from "react";
import { BadgeItemData } from "../../components/atoms/BadgeItem";
import { CardItemData } from "../../components/atoms/CardItem";
import MainLayout from "../../components/layouts/MainLayout";
import { BadgeBar } from "../../components/molecules/BadgeBar";
import { CardGrid } from "../../components/molecules/CardGrid";
import { SelectControl, SelectOption } from "../../components/molecules/SelectControl";
import Rocket from "../../public/rocket.svg";
import { useRouter } from "next/router";

const Landing = () => {
  const Router = useRouter()

  return (
    <>
      <section className="relative">
        <div className="container flex flex-col-reverse md:flex-row items-center gap-12 my-14 md:my-16">
          <div className="flex flex-col items-center md:items-start md:ml-[10%] md:basis-8/12">
            <h1 className="text-white font-[100] text-6xl text-center md:text-left md:text-8xl">
              Discover the best Building tools for{" "}
              <span className="text-violet-700 font-[600]">Web3</span>
            </h1>
            <div className="text-white text-center text-lg mt-8 md:text-left md:max-w-[50%]">
              A growing and community-run database indexing (almost) every live tool across the Web3 ecosystem
            </div>
            <button className="primary hover:bg-violet-800 mt-8" onClick={() => Router.push("tools")}>Find Your Tool</button>
          </div>
          <div className="relative w-[70%] md:absolute md:top-18 md:right-16 md:w-[35%] lg:top-[1rem] lg:right-[5rem]">
            <Image src={Rocket} layout="responsive" objectFit="cover" priority={false} />
          </div>
        </div>
      </section>
    </>
  )
}

Landing.layout = MainLayout

export default Landing;