import { FC } from "react"

interface BadgeItemData {
  name: string,
  count: number,
  value: any,
};

interface BadgeItemProps {
  data: BadgeItemData,
  active?: boolean,
  onClick?: () => void
}

const BadgeItem: FC<BadgeItemProps> = ({ data, onClick = () => { }, active = false }: BadgeItemProps) => {
  return (
    <div className={`px-3 py-2 cursor-pointer ${active ?
      "border-solid border-b-4 border-purple-700"
      : null}`
    } onClick={onClick}>
      <span className="text-[#6B6B6B] font-normal text-lg whitespace-nowrap">{data.name}</span>
      <span className="text-white font-normal py-2 px-3 ml-3 text-sm bg-[#606060] rounded-2xl">{data.count}</span>
    </div>
  )
}

export { BadgeItem }
export type { BadgeItemData, BadgeItemProps }