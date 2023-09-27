import { useLocation } from "react-router-dom";
import DashHeader from "../DashHeader/DashHeader";
import "./public.css";

const Public = () => {
  const { pathname } = useLocation();
  const content = (
    <>
      <DashHeader />
      <section className="public public__public-page">
        <header>
          <h1>
            Welcome to{" "}
            <span className="nowrap">All Purpose The Advocate dashboard</span>
          </h1>
        </header>
        {/* <footer>
          <Link to="/login">Employee Login</Link>
        </footer> */}
      </section>
    </>
  );
  return content;
};
export default Public;
