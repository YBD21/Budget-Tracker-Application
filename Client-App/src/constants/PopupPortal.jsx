import ReactDOM from "react-dom";
import { Fragment } from "react";
const modelRoot = document.getElementById("portalModel");

const PopupPortal = ({ children }) => {
  return ReactDOM.createPortal(<Fragment>{children}</Fragment>, modelRoot);
};

export default PopupPortal;
