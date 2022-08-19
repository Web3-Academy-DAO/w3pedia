import { AppBar, AppFooter } from "../molecules";
import { LayoutProps } from "./PageWithLayoutType";

export const MainLayout: LayoutProps = ({ children }) => {
  return (
    <>
      <AppBar />
      <div className="max-w-[90%] mx-auto">{children}</div>
      <AppFooter />
    </>
  );
};
