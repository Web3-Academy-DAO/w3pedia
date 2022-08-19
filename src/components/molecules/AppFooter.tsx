import { FC } from "react";
import { FaDiscord, FaSpotify, FaTwitter } from "react-icons/fa";

export const AppFooter: FC = () => {
  const data = [
    { name: "Home", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Terms of Service", link: "#" },
    { name: "Tools", link: "#" },
    { name: "Discount", link: "#" },
    { name: "Privacy Policy", link: "#" }
  ]

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap bg-[#343038] py-10">
        {data.map((item, index) =>
          <div className="p-2 text-white text-center text-lg md:text-sm md:w-1/3" key={index}>
            <span className="cursor-pointer">{item.name}</span>
          </div>
        )}
        <div className="pt-5 text-white text-sm text-center md:text-left md:text-sm md:w-1/3">
          <span className="pl-2">Brought to you by the Web 3 Academy DAO</span>
        </div>
        <div className="pt-5 text-white flex flex-row justify-center gap-10 md:w-1/3">
          <FaDiscord className="w-5 h-5 cursor-pointer" />
          <FaTwitter className="w-5 h-5 cursor-pointer" />
          <FaSpotify className="w-5 h-5 cursor-pointer" />
        </div>
        <div className="pt-5 text-white text-sm text-center md:text-right md:text-sm md:w-1/3">
          <span className="pr-2">Brought to you by the Web 3 Academy DAO</span>
        </div>
      </div>
    </>
  )
}
