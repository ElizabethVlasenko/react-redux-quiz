import React from "react";
import classes from "./MenuToggle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const MenuToggle = (props) => {
  const cls = [classes.MenuToggle];
  let ico;

  if (props.isOpen) {
    ico = faTimes;
    cls.push(classes.open);
  } else {
    ico = faBars;
  }

  return (
    <FontAwesomeIcon
      icon={ico}
      className={cls.join(" ")}
      onClick={props.onToggle}
    />
  );
};

export default MenuToggle;
