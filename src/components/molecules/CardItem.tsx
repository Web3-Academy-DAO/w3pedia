import { FC } from "react"
import Image from "next/image"
import Rocket from "../../../public/rocket.svg"
import { RatingBar } from "./RatingBar"

interface CardItemData {
  title: string,
  content: string,
  chains: string[],
  tags: string[],
  rating: number,
};

interface CardItemProps {
  data: CardItemData
}

export const CardItem: FC<CardItemProps> = ({ data }: CardItemProps) => {
  return <div className="text-white flex flex-col bg-[#343038] p-5 gap-3 rounded-lg">
    <div className="flex flex-row relative items-center gap-2">
      <div className="flex-none">
        <div className="w-12 h-12 rounded-full bg-[#D9D9D9]">
          <Image src={Rocket} layout="responsive" objectFit="cover" priority={false} />
        </div>

      </div>
      <div className="shrink">
        <p className="text-lg pl-1 font-semibold">
          {data.title}
        </p>
      </div>
      <div className="flex-none">
        <RatingBar total={5} active={data.rating} />
      </div>
    </div>
    <div className="text-md">
      {data.content}
    </div>
    <div className="flex flow-row items-start pt-5">
      <div className="basis-4/12 flex flex-col gap-2">
        {data.chains.map((item, index) =>
          <div key={index}>
            <span className="py-1 px-2 text-xs font-medium rounded-lg bg-purple-600">{item}</span>
          </div>
        )}
      </div>
      <div className="basis-8/12 flex flex-row flex-wrap gap-2">
        {data.tags.map((item, index) =>
          <div key={index} className="py-1 px-2 text-xs text-gray-700 font-medium rounded-lg bg-purple-300">{item}</div>
        )}
      </div>
    </div>
    <div>
      <button className="w-full bg-gray-700 hover:bg-violet-800 text-sm py-1 px-2 rounded-md text-gray-300 hover:text-gray-100">Learn More</button>
    </div>
  </div>
}

export type { CardItemData, CardItemProps }