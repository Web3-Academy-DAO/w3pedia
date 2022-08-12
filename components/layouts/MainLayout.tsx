import AppBar from "../molecules/AppBar";
import AppFooter from "../molecules/AppFooter";
import { LayoutProps } from "./pageWithLayoutType";

const MainLayout: LayoutProps = ({ children }) => {
  return (
    <>
      <AppBar />
      <div>{children}</div>
      <AppFooter />
    </>
  )
}

export default MainLayout