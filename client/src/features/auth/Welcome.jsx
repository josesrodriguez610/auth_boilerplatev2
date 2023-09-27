import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import { useSendLogoutMutation } from "./authApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import YearSelector from "../../components/YearPicker/YearPicker";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const Welcome = () => {
  const { pathname } = useLocation();
  const userAuth = useAuth();

  // useTitle(`The Advocate: ${email}`);

  let dashClass = null;

  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname) &&
    pathname !== "/"
  ) {
    dashClass = "dash-header__container--small";
  }

  // let settings = [
  //   // { name: "Profile", path: onProfileClicked },
  //   { name: "Logout", path: sendLogout },
  // ];

  const content = <div className="container mx-auto"></div>;

  return content;
};
export default Welcome;
