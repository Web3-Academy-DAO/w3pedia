import Image from "next/image";
import { useState } from "react";
import Rocket from "../../public/rocket.svg";
import { SelectControl, SelectOption } from "../../components/molecules/SelectControl";
import AppBar from "../../components/molecules/AppBar";
import { BadgeBar } from "../../components/molecules/BadgeBar";
import { BadgeItemData } from "../../components/atoms/BadgeItem";
import { CardItemData } from "../../components/atoms/CardItem";
import { CardGrid } from "../../components/molecules/CardGrid";


const Landing = () => {
  const cardItems: CardItemData[] = [
    { title: "Example Name", rating: 1, chains: ["Ethereum", "Polygon", "Chainlink", "Solona", "Testnet"], tags: ["NFT1", "NFT2", "NFT3", "NFT1", "NFT2", "NFT3", "NFT1", "NFT2", "NFT3"], content: "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short" },
    { title: "Example Name", rating: 2, chains: ["Ethereum", "Polygon"], tags: ["NFT1", "NFT2", "NFT3"], content: "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short" },
    { title: "Example Name", rating: 2, chains: ["Ethereum", "Polygon"], tags: ["NFT1", "NFT2", "NFT3"], content: "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short" },
    { title: "Example Name", rating: 5, chains: ["Ethereum", "Polygon"], tags: ["NFT1", "NFT2", "NFT3"], content: "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short" },
    { title: "Example Name", rating: 4, chains: ["Ethereum", "Polygon"], tags: ["NFT1", "NFT2", "NFT3"], content: "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short" },
    { title: "This Is A Long Long Long Long Name", rating: 3, chains: ["Ethereum", "Polygon"], tags: ["NFT1", "NFT2", "NFT3"], content: "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short" },
    { title: "This Is A Long Long Long Long Name", rating: 2, chains: ["Ethereum", "Polygon"], tags: ["NFT1", "NFT2", "NFT3"], content: "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short" }
  ]

  const badgeBarItems: BadgeItemData[] = [
    { name: "NTFs", count: 10, value: 1 },
    { name: "Tokens", count: 20, value: 2 },
    { name: "Chains", count: 100, value: 3 },
    { name: "Tools #1", count: 8, value: 4 },
    { name: "Tools #2", count: 13, value: 5 },
  ]

  const [selectedBadge, setSelectedBadge] = useState(badgeBarItems[0])

  const toDoItems: SelectOption[] = [
    { name: 'Design an NFT #1', value: "1" },
    { name: 'Design an NFT #2', value: "2" },
    { name: 'Design an NFT #3', value: "3" },
    { name: 'Design an NFT #4', value: "4" },
    { name: 'Design an NFT #5', value: "5" },
  ]

  const [selectedToDoItem, setSelectedToDoItem] = useState({ name: "What would you like to work on?", value: "0" })

  return (
    <>
      <AppBar />
      <section className="relative">
        <div className="container flex flex-col-reverse md:flex-row items-center gap-12 mt-14 md:mt-16">
          <div className="flex flex-col items-center md:items-start md:ml-[10%] md:basis-8/12">
            <h1 className="text-white font-[100] text-6xl text-center md:text-left md:text-8xl">
              Discover the best Building tools for{" "}
              <span className="text-violet-700 font-[600]">Web3</span>
            </h1>
            <div className="text-white text-center text-lg mt-8 md:text-left md:max-w-[50%]">
              A growing and community-run database indexing (almost) every live tool across the Web3 ecosystem
            </div>
            <button className="primary hover:bg-violet-800 mt-8">Find Your Tool</button>
          </div>
          <div className="relative w-[70%] md:absolute md:top-18 md:right-16 md:w-[35%] lg:top-[1rem] lg:right-[5rem]">
            <Image src={Rocket} layout="responsive" objectFit="cover" priority={false} />
          </div>
        </div>
      </section>
      <section className="mt-20">
        <div className="sm:w-3/4 md:w-5/12 mx-auto py-8 ">
          <h1 className="text-xl font-[700] text-center text-white">
            Find Your Web3 Tools
          </h1>
        </div>
        <div className="flex flex-1 justify-center py-8 ">
          <div className="relative w-11/12 md:w-5/12">
            <SelectControl data={toDoItems} onChange={setSelectedToDoItem} value={selectedToDoItem} />
          </div>
        </div>
      </section>
      <section className="relative" >
        <div className="sm:w-3/4 md:w-5/12 mx-auto py-8 ">
          <h1 className="text-xl font-[700] text-center text-white py-28 ">
            Another Section
          </h1>
        </div>
        <div className="flex flex-1 justify-center py-8">
          <div className="w-full md:basis-10/12">
            <BadgeBar data={badgeBarItems} onChange={setSelectedBadge} value={selectedBadge} />
          </div>
        </div>
        <div className="flex flex-1 justify-center py-8  ">
          <div className="w-full md:basis-10/12">
            <CardGrid data={cardItems} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Landing;