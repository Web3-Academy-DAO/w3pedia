import { FC } from "react";
import { CardItem, CardItemData } from "./CardItem";

interface CardGridProps {
  data: CardItemData[]
}

export const CardGrid: FC<CardGridProps> = ({ data }: CardGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 content-start items-start">
      {data.map((item, index) =>
        <div className="w-full" key={index}>
          <CardItem data={item} />
        </div>
      )}
    </div>
  )
}

export type { CardGridProps };