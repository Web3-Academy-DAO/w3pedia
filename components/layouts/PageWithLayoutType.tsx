import { NextPage } from "next";
import MainLayout from "./MainLayout";

export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout }

export type PageWithLayoutType = | PageWithMainLayoutType

export type LayoutProps = ({children}: {children: JSX.Element}) => JSX.Element

export default PageWithLayoutType