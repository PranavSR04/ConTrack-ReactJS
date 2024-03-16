import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import styles from "./breadcrumbs.module.css"

const BreadCrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // Generate breadcrumb items from pathSnippets
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      path: url,
      breadcrumbName: pathSnippets[index].trim(), // Trim whitespace
    };
  });

  return (
    <Breadcrumb>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          className={`breadcrumb_item ${styles.breadcrumb_item}`}
        >
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
