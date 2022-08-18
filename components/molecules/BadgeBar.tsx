import { FC } from "react"
import { BadgeItem, BadgeItemData } from "../atoms/BadgeItem"

interface BadgeBarProps {
  data?: BadgeItemData[],
  value?: BadgeItemData,
  onChange?: (value: BadgeItemData) => void
};

const BadgeBar: FC<BadgeBarProps> = ({ data = [], value, onChange = () => { } }: BadgeBarProps) => {
  return (
    <div className="container flex flex-row flex-nowrap overflow-auto md:flex-wrap gap-4 scrollbar-hide md:justify-center">
      {data.map((item, index) => (
        <BadgeItem data={item} key={index} onClick={() => onChange(item)} active={value?.value == item.value} />
      ))}
    </div>
  )
}

export { BadgeBar }
export type { BadgeBarProps }