import React from "react";

interface IButton {
  /** the text a button contains. Can also contain icons */
  children?: string | React.Component;
  /** classes that override the component's styles */
  className?: string;
  /** denotes style */
  type?: "primary" | "secondary" | "nav";
}

export const Button = ({
  children,
  className,
  type = "primary",
  ...rest
}: IButton) => {
  return (
    <button
      className={`text-white font-normal text-base bg-violet-700 hover:bg-violet-800 active:bg-violet-900 px-4 py-2 rounded md:rounded-md ${
        type === "secondary" &&
        "bg-gray-600 hover:bg-gray-700 active:bg-gray-800"
      } ${
        type === "nav" &&
        "bg-transparent hover:bg-gray-700 active:bg-gray-800"
      } ${className}`}
      {...rest}
    >
      {children as any}
    </button>
  );
};
