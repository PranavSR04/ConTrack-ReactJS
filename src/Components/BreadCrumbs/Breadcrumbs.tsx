import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // Generate breadcrumb items from pathSnippets
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      path: url,
      breadcrumbName: pathSnippets[index],
    };
  });

  return (
    <Breadcrumb>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {index === breadcrumbItems.length - 1 ? (
            <span>{item.breadcrumbName}</span>
          ) : (
            <Link to={item.path}>{item.breadcrumbName}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
