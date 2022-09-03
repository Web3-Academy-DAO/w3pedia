import React, { FC } from "react";

interface ButtonInterface {
  children?: string | React.Component
  className?: string
  disabled?: boolean
  type: "primary" | "secondary" | "nav"
  onClick?: () => void
}

export const Button: FC<ButtonInterface> = ({ children, className, type = "primary", ...rest }: ButtonInterface) => {
  const getTypeClassString = () => {
    if (type == "primary") {
      return "bg-violet-700 hover:bg-violet-800 active:bg-violet-900 disabled:bg-gray-600 disabled:text-gray-500"
    } else if (type == "secondary") {
      return "bg-gray-600 hover:bg-gray-700 active:bg-gray-800 disabled:bg-gray-600 disabled:text-gray-500"
    } else {
      return ""
    }
  }

  return (
    <button className={`text-white font-normal text-base px-4 py-2 rounded md:rounded-md ${getTypeClassString()} ${className}`} {...rest}>
      {children as any}
    </button>
  );
};