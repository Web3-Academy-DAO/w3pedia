import React from "react";

interface INavListItem {
  /** the text a button contains. Can also contain icons */
  children?: any;
  /** classes that override the component's styles */
  className?: string;
}

export const NavListItem = ({ children, className, ...rest }: INavListItem) => {
  return <li className={className}>{children}</li>;
};
