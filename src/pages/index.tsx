import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MainLayout } from "../components/layouts";
import { BadgeItemData, Button } from "../components/atoms";
import { CategoryData } from "../components/atoms/DataInterface";
import {
  CardItemData,
  CardGrid,
  SelectControl,
  SelectionControl,
  SelectOption,
} from "../components/molecules";
import Rocket from "../../public/rocket.png";
import { CurrencyDollarIcon } from "@heroicons/react/solid";
import { Link as ScrollLink } from "react-scroll";
import NetworkClient from "../components/services/NetworkClient";
import QueryString from "qs";

const Tools = () => {
  const Router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [completedTab, setCompletedTab] = useState(-1);
  const [tags, setTags] = useState<SelectOption[]>([]);
  const [cardItems, setCardItems] = useState<CardItemData[]>([]);
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([]);
  const [blockchains, setBlockchains] = useState<SelectOption[]>([]);
  const [selectedBlockchains, setSelectedBlockchains] = useState<SelectOption[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);

  const badgeBarItems: BadgeItemData[] = [
    { name: "NTFs", count: 10, value: 1 },
    { name: "Tokens", count: 20, value: 2 },
    { name: "Chains", count: 100, value: 3 },
    { name: "Tools #1", count: 8, value: 4 },
    { name: "Tools #2", count: 13, value: 5 },
  ];

  const [selectedBadge, setSelectedBadge] = useState(badgeBarItems[0]);

  const data = [
    { title: "1", subtitle: "Choose Your Category" },
    { title: "2", subtitle: "Choose Your Use-Case" },
    { title: "3", subtitle: "Choose Your Blockchain" },
    { title: "4", subtitle: "View Tools" },
  ];

  const loadCategories = () => {
    NetworkClient.makeGet("/api/categories", {}, 0, 999, (resp) => {
      let categories = resp?.data?.data?.map((item: any) => {
        return { id: item.id, name: item.attributes.name };
      });
      setCategories(categories);
    });
  };

  const loadTags = () => {
    NetworkClient.makeGet("/api/tags", {}, 0, 999, (resp) => {
      let tags = resp?.data?.data?.map((item: any) => {
        return { name: item.attributes.name, value: item.id };
      });
      setTags(tags);
    });
  };

  const loadBlockchains = () => {
    NetworkClient.makeGet("/api/blockchains", {}, 0, 999, (resp) => {
      let tags = resp?.data?.data?.map((item: any) => {
        return { name: item.attributes.name, value: item.id };
      });
      setBlockchains(tags);
    });
  };

  const loadItems = () => {
    const query = QueryString.stringify({
      filters: {
        blockchains: {
          id: {
            $in: selectedBlockchains.map((b) => b.value)
          }
        },
        category: {
          id: {
            $in: [selectedCategory?.id]
          }
        },
        tags: {
          id: {
            $in: selectedTags.map((t) => t.value)
          }
        }
      },
      populate: ["tags", "blockchains", "category"]
    }, {
      encodeValuesOnly: true,
    });

    NetworkClient.makeGet("/api/tools?" + query, {}, 0, 999, (resp) => {
      let tools = resp?.data?.data?.map((tool: any) => {
        return {
          title: tool.attributes.name,
          rating: 3,
          chains: tool.attributes.blockchains.data.map((blockchain: any) => blockchain.attributes.name),
          tags: tool.attributes.tags.data.map((tag: any) => tag.attributes.name),
          content: tool.attributes.description
        };
      });

      setCardItems(tools);
    });
  };

  const onHandleBlockchain = (e: SelectOption, add: boolean) => {
    let found = selectedBlockchains.filter((item) => item.value == e.value);

    if (found.length == 0 && add == true) {
      let newSelectedBlockchains = [...selectedBlockchains];
      newSelectedBlockchains.push(e);
      setSelectedBlockchains(newSelectedBlockchains);
    } else if (found.length > 0 && add == false) {
      let newSelectedBlockchains = selectedBlockchains.filter(
        (item) => item.value != e.value
      );
      setSelectedBlockchains([...newSelectedBlockchains]);
    }
  };

  const onHandleUseCase = (e: SelectOption, add: boolean) => {
    let found = selectedTags.filter((item) => item.value == e.value);

    if (found.length == 0 && add == true) {
      let newSelectedTags = [...selectedTags];
      newSelectedTags.push(e);
      setSelectedTags(newSelectedTags);
    } else if (found.length > 0 && add == false) {
      let newSelectedTags = selectedTags.filter(
        (item) => item.value != e.value
      );
      setSelectedTags([...newSelectedTags]);
    }
  };

  const onHandleActiveTab = (index: number) => {
    if (completedTab + 1 < index) return;

    if (index < 3) setSelectedBlockchains([]);
    if (index < 2) setSelectedTags([]);
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
    if (selectedTags.length > 0) completed = 1;
    if (selectedBlockchains.length > 0) completed = 2;
    setCompletedTab(completed);
  }, [selectedCategory, selectedTags, selectedBlockchains]);

  useMemo(() => {
    if (activeTab == 3) {
      loadItems();
    }
  }, [activeTab]);

  useEffect(() => {
    loadCategories();
    loadTags();
    loadBlockchains();
  }, []);

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
              priority={true}
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
            {categories.map((item, index) => (
              <div
                className={`cursor-pointer py-3 ${item == selectedCategory ? "bg-[#7A00FF]" : ""
                  } hover:bg-[#7A00FF] rounded-md`}
                key={item.id}
                onClick={() => {
                  setSelectedCategory(item);
                }}
              >
                <CurrencyDollarIcon className="w-8 h-8 mx-auto" />
                <div className="mt-2 text-white text-sm text-center">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`text-white ${activeTab != 1 ? "hidden" : ""}`}>
          <div className="flex flex-1 justify-center py-8 ">
            <div className="relative w-11/12 md:w-5/12">
              <SelectControl
                data={tags}
                onChange={(e) => {
                  onHandleUseCase(e, true);
                }}
                value={{ name: "What would you like to work on?", value: "0" }}
              />
            </div>
          </div>
          <div className="grid w-11/12 grid-cols-2 md:w-8/12 md:grid-cols-3 gap-1 mx-auto">
            <SelectionControl
              data={selectedTags}
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
                data={blockchains}
                onChange={(e) => {
                  onHandleBlockchain(e, true);
                }}
                value={{ name: "Choose your blockchain(s)?", value: "0" }}
              />
            </div>
          </div>
          <div className="grid w-11/12 grid-cols-2 md:w-8/12 md:grid-cols-3 gap-1 mx-auto">
            <SelectionControl
              data={selectedBlockchains}
              onChange={(e) => {
                onHandleBlockchain(e, false);
              }}
            />
          </div>
        </div>
        <div className={`text-white ${activeTab != 3 ? "hidden" : ""}`}>
          {/* <div className="flex flex-1 justify-center py-8">
            <BadgeBar
              data={badgeBarItems}
              onChange={setSelectedBadge}
              value={selectedBadge}
            />
          </div> */}
          <div className="flex flex-1 justify-center py-8  ">
            <div className="w-full md:basis-10/12">
              {cardItems.length > 0 && <CardGrid data={cardItems} />}
              {cardItems.length == 0 && <div className="w-full text-center">No tools found, you can <span className="cursor-pointer text-purple-500 hover:text-white" onClick={() => Router.push("/login")}>login</span> and submit a new tool!</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Tools.layout = MainLayout;

export default Tools;
