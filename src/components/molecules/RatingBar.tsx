import { StarIcon } from "@heroicons/react/solid"
import { FC } from "react"

interface RatingBarProps {
  total: number,
  active: number
}

export const RatingBar: FC<RatingBarProps> = ({ total, active }: RatingBarProps) => {
  return <div className="flex flex-row flex-nowrap">
    {Array.from(Array(total), (e, index) =>
      <span className="" key={index}>
        <StarIcon className={`h-4 w-4 ${index >= active ? "text-gray-400" : "text-purple-700"}`} />
      </span>
    )}
  </div>
}
