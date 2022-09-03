import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MainLayout } from "../components/layouts";
import { BadgeItemData, Button } from "../components/atoms";
import {
  CardItemData,
  CardGrid,
  BadgeBar,
  SelectControl,
  SelectionControl,
  SelectOption,
} from "../components/molecules";
import Rocket from "../../public/rocket.svg";
import { CurrencyDollarIcon } from "@heroicons/react/solid";
import { Link as ScrollLink } from "react-scroll";

const Tools = () => {
  const Router = useRouter();

  const [activeTab, setActiveTab] = useState(0);
  const [completedTab, setCompletedTab] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState<{
    title: string;
  } | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<SelectOption[]>([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState<SelectOption[]>(
    []
  );

  const cardItems: CardItemData[] = [
    {
      title: "Example Name",
      rating: 1,
      chains: ["Ethereum", "Polygon", "Chainlink", "Solona", "Testnet"],
      tags: [
        "NFT1",
        "NFT2",
        "NFT3",
        "NFT1",
        "NFT2",
        "NFT3",
        "NFT1",
        "NFT2",
        "NFT3",
      ],
      content:
        "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short",
    },
    {
      title: "Example Name",
      rating: 2,
      chains: ["Ethereum", "Polygon"],
      tags: ["NFT1", "NFT2", "NFT3"],
      content:
        "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short",
    },
    {
      title: "Example Name",
      rating: 2,
      chains: ["Ethereum", "Polygon"],
      tags: ["NFT1", "NFT2", "NFT3"],
      content:
        "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short",
    },
    {
      title: "Example Name",
      rating: 5,
      chains: ["Ethereum", "Polygon"],
      tags: ["NFT1", "NFT2", "NFT3"],
      content:
        "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short",
    },
    {
      title: "Example Name",
      rating: 4,
      chains: ["Ethereum", "Polygon"],
      tags: ["NFT1", "NFT2", "NFT3"],
      content:
        "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short",
    },
    {
      title: "This Is A Long Long Long Long Name",
      rating: 3,
      chains: ["Ethereum", "Polygon"],
      tags: ["NFT1", "NFT2", "NFT3"],
      content:
        "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short",
    },
    {
      title: "This Is A Long Long Long Long Name",
      rating: 2,
      chains: ["Ethereum", "Polygon"],
      tags: ["NFT1", "NFT2", "NFT3"],
      content:
        "Here’s a little blurb about what this company does. It should be short Here’s a little blurb about what this company does. It should be short",
    },
  ];

  const badgeBarItems: BadgeItemData[] = [
    { name: "NTFs", count: 10, value: 1 },
    { name: "Tokens", count: 20, value: 2 },
    { name: "Chains", count: 100, value: 3 },
    { name: "Tools #1", count: 8, value: 4 },
    { name: "Tools #2", count: 13, value: 5 },
  ];

  const [selectedBadge, setSelectedBadge] = useState(badgeBarItems[0]);

  const useCaseItems: SelectOption[] = [
    { name: "Design an NFT #1", value: "1" },
    { name: "Design an NFT #2", value: "2" },
    { name: "Design an NFT #3", value: "3" },
    { name: "Design an NFT #4", value: "4" },
    { name: "Design an NFT #5", value: "5" },
  ];

  const blockchainItem: SelectOption[] = [
    { name: "Blockchain #1", value: "1" },
    { name: "Blockchain #2", value: "2" },
    { name: "Blockchain #3", value: "3" },
    { name: "Blockchain #4", value: "4" },
  ];

  const data = [
    { title: "1", subtitle: "Choose Your Category" },
    { title: "2", subtitle: "Choose Your Use-Case" },
    { title: "3", subtitle: "Choose Your Blockchain" },
    { title: "4", subtitle: "View Tools" },
  ];

  const categoryData = [
    { title: "NFTs" },
    { title: "Defi" },
    { title: "Daos" },
    { title: "Digital Identities" },
    { title: "MetaVerse" },
    { title: "Gaming" },
  ];

  const onHandleBlockchain = (e: SelectOption, add: boolean) => {
    let found = selectedBlockchain.filter((item) => item.value == e.value);

    if (found.length == 0 && add == true) {
      let newSelectedBlockchain = [...selectedBlockchain];
      newSelectedBlockchain.push(e);
      setSelectedBlockchain(newSelectedBlockchain);
    } else if (found.length > 0 && add == false) {
      let newSelectedBlockchain = selectedBlockchain.filter(
        (item) => item.value != e.value
      );
      setSelectedBlockchain([...newSelectedBlockchain]);
    }
  };

  const onHandleUseCase = (e: SelectOption, add: boolean) => {
    let found = selectedUseCase.filter((item) => item.value == e.value);

    if (found.length == 0 && add == true) {
      let newSelectedUseCase = [...selectedUseCase];
      newSelectedUseCase.push(e);
      setSelectedUseCase(newSelectedUseCase);
    } else if (found.length > 0 && add == false) {
      let newSelectedUseCase = selectedUseCase.filter(
        (item) => item.value != e.value
      );
      setSelectedUseCase([...newSelectedUseCase]);
    }
  };

  const onHandleActiveTab = (index: number) => {
    if (completedTab + 1 < index) return;

    if (index < 3) setSelectedBlockchain([]);
    if (index < 2) setSelectedUseCase([]);
    if (index < 1) setSelectedCategory(null);

    setActiveTab(index);
  };

  const additionalTabClassName = (index: number, completedTab: number) => {
    if (activeTab == index) {
      return "bg-[#7A00FF] text-white";
    } else if (index == completedTab + 1) {
      return "text-white";
    } else if (index > completedTab + 1) {
      return "text-gray-600";
    } else return "text-white";
  };

  useMemo(() => {
    let completed = -1;
    if (selectedCategory != null) completed = 0;
    if (selectedUseCase.length > 0) completed = 1;
    if (selectedBlockchain.length > 0) completed = 2;
    setCompletedTab(completed);
  }, [selectedCategory, selectedUseCase, selectedBlockchain]);

  return (
    <>
      <section className="relative">
        <div className="container flex flex-col-reverse md:flex-row items-center gap-12 my-14 md:my-16">
          <div className="flex flex-col items-center md:items-start md:ml-[10%] md:basis-8/12" >
            <h1 className="text-white font-[100] text-4xl text-center md:text-left md:text-6xl max-w-lg">
              Discover the best building tools for{" "}
              <span className="text-violet-700 font-[600]">Web3</span>
            </h1>
            <div className="text-white text-center text-lg mt-8 md:text-left max-w-lg">
              A growing and community-run database indexing (almost) every live
              tool across the Web3 ecosystem
            </div>
            <ScrollLink to="tools" smooth offset={-50} duration={500}>
              <Button type="primary" className="mt-8">Find your Tool</Button>
            </ScrollLink>
          </div>
          <div className="w-[70%] sm:w-[50%]">
            <Image
              src={Rocket}
              alt="rocket shooting upwards majestically"
              layout="responsive"
              objectFit="cover"
              priority={false}
            />
          </div>
        </div>
      </section>
      <section className="mb-20">
        <div className="sm:w-3/4 md:w-5/12 mx-auto py-8 ">
          <h1 id="tools" className="text-2xl font-[400] text-center text-white">
            Find Your Web3 Tools
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-11/12 sm:w-6/12 mx-auto my-8 bg-[#343038] rounded-lg gap-2 px-2 py-2">
          {data.map((item, index) => (
            <div
              key={index}
              className={`md:basis-1/4 px-4 py-2 rounded-md cursor-pointer text-center ${additionalTabClassName(
                index,
                completedTab
              )}`}
              onClick={() => onHandleActiveTab(index)}
            >
              <div className="text-3xl font-semibold">{item.title}</div>
              <div className="text-sm font-light">{item.subtitle}</div>
            </div>
          ))}
        </div>

        <div className={`text-white ${activeTab != 0 ? "hidden" : ""}`}>
          <div className="grid w-11/12 grid-cols-3 gap-1 md:w-6/12 md:grid-cols-6 md:gap-4 mx-auto">
            {categoryData.map((item, index) => (
              <div
                className={`cursor-pointer py-3 ${item.title == selectedCategory?.title ? "bg-[#7A00FF]" : ""
                  } hover:bg-[#7A00FF] rounded-md`}
                key={index}
                onClick={() => {
                  setSelectedCategory(item);
                }}
              >
                <CurrencyDollarIcon className="w-8 h-8 mx-auto" />
                <div className="mt-2 text-white text-sm text-center">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`text-white ${activeTab != 1 ? "hidden" : ""}`}>
          <div className="flex flex-1 justify-center py-8 ">
            <div className="relative w-11/12 md:w-5/12">
              <SelectControl
                data={useCaseItems}
                onChange={(e) => {
                  onHandleUseCase(e, true);
                }}
                value={{ name: "What would you like to work on?", value: "0" }}
              />
            </div>
          </div>
          <div className="grid w-11/12 grid-cols-2 md:w-8/12 md:grid-cols-3 gap-1 mx-auto">
            <SelectionControl
              data={selectedUseCase}
              onChange={(e) => {
                onHandleUseCase(e, false);
              }}
            />
          </div>
        </div>
        <div className={`text-white ${activeTab != 2 ? "hidden" : ""}`}>
          <div className="flex flex-1 justify-center py-8 ">
            <div className="relative w-11/12 md:w-5/12">
              <SelectControl
                data={blockchainItem}
                onChange={(e) => {
                  onHandleBlockchain(e, true);
                }}
                value={{ name: "Choose your blockchain(s)?", value: "0" }}
              />
            </div>
          </div>
          <div className="grid w-11/12 grid-cols-2 md:w-8/12 md:grid-cols-3 gap-1 mx-auto">
            <SelectionControl
              data={selectedBlockchain}
              onChange={(e) => {
                onHandleBlockchain(e, false);
              }}
            />
          </div>
        </div>
        <div className={`text-white ${activeTab != 3 ? "hidden" : ""}`}>
          <div className="flex flex-1 justify-center py-8">
            <BadgeBar
              data={badgeBarItems}
              onChange={setSelectedBadge}
              value={selectedBadge}
            />
          </div>
          <div className="flex flex-1 justify-center py-8  ">
            <div className="w-full md:basis-10/12">
              <CardGrid data={cardItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Tools.layout = MainLayout;

export default Tools;
