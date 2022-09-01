import { AppBar, AppFooter } from "../molecules";
import { ErrorModal } from "../molecules/ErrorModal";
import { LayoutProps } from "./PageWithLayoutType";

export const MainLayout: LayoutProps = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ErrorModal />
      <div><AppBar /></div>
      <div className="container max-w-[90%] mx-auto flex-auto">
        {children}
      </div>
      <div><AppFooter /></div>
    </div>
  );
};
