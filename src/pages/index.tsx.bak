import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { NavBar } from "../../components/molecules";
import Rocket from "../../public/rocket.svg";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Web3Pedia</title>
        <meta
          name="description"
          content="Hand-picked Tools and Resources for web3 dOers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className=" w-full h-screen px-10 md:flex">
        <div className="flex justify-center flex-col items-center md:items-start">
          <h1 className="text-white font-[100] text-[3rem] text-center md:text-left md:text-[6rem]">
            Discover the best Building tools for{" "}
            <span className="text-violet-700 font-[600]">Web3</span>
          </h1>
          <p className="text-white text-center md:text-left max-w-[90%] md:max-w-[50%]">
            A growing and community-run database indexing (almost) every live
            tool across the Web3 ecosystem
          </p>
        </div>
        <Image src={Rocket} alt="Rocket Blasting Off"/>
      </main>
    </div>
  );
};

export default Home;
