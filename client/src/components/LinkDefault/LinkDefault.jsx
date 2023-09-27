import React from "react";
import { Link } from "react-router-dom";
import "./LinkDefault.css";

const LinkDefault = ({ to, title }) => {
  return (
    <Link
      className="link__color"
      style={{ marginBottom: "10px", display: "inline-block" }}
      to={to}
    >
      {title}
    </Link>
  );
};

export default LinkDefault;
