import { AppBar, AppFooter } from "../molecules";
import { LayoutProps } from "./PageWithLayoutType";

export const MainLayout: LayoutProps = ({ children }) => {
  return (
    <>
      <AppBar />
      <div>{children}</div>
      <AppFooter />
    </>
  );
};
