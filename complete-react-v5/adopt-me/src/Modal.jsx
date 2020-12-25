import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // refs 相当于一个独立于当前函数作用域的状态容器
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.querySelector("#modal");
    modalRoot.appendChild(elRef.current);
    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  // createPortal(content, rootElement)
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
