import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BreadCrumps() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(path => path !== "");

  let currenLink = "";
  
  const crump = paths.map((path, index) => {
    currenLink += `/${path}`;
    return (
      <Link key={index} to={currenLink}>
        {path}
      </Link>
    );
  });

  return (
    <div>
      <Breadcrumbs>{crump}</Breadcrumbs>
    </div>
  );
}
