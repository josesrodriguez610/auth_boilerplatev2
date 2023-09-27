import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";

const DashLayout = () => {
  return (
    <>
      <Nav />
      <div className="dash-container">
        <Outlet />
      </div>
    </>
  );
};
export default DashLayout;
