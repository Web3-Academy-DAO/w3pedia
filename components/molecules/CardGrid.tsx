import { FC } from "react";
import { CardItem, CardItemData } from "../atoms/CardItem";

interface CardGridProps {
  data: CardItemData[]
}

const CardGrid: FC<CardGridProps> = ({ data }: CardGridProps) => {
  return (
    <div className="px-2 grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4 content-start items-start">
      {data.map((item, index) =>
        <div className="flex" key={index}>
          <CardItem data={item} />
        </div>
      )}
    </div>
  )
}

export { CardGrid };
export type { CardGridProps };