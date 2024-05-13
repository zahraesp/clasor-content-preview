"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ArrowUpIcon } from "./assets/svg";

interface IProps {
  elementToScrollClass: string | "window";
  position: string;
}

const BackToTop = ({ elementToScrollClass, position }: IProps) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const getElementToScroll = useCallback(() => {
    const elementToScroll = elementToScrollClass === "window"
      ? window
      : (document.querySelector(elementToScrollClass) as
            | HTMLDivElement
            | Window);

    return elementToScroll;
  }, [elementToScrollClass]);

  useEffect(() => {
    const elementToScroll = getElementToScroll();
    const handleScroll = () => {
      setShowTopBtn(
        elementToScroll instanceof Window
          ? elementToScroll.scrollY > 500
          : elementToScroll.scrollTop > 500,
      );
    };

    elementToScroll?.addEventListener("scroll", handleScroll);

    return () => {
      elementToScroll?.removeEventListener("scroll", handleScroll);
    };
  }, [elementToScrollClass, getElementToScroll]);

  const goToTopWindow = () => {
    getElementToScroll()?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`go-to-top rounded-full p-4 fixed bg-blue-900 shadow-xl transition-all duration-300 z-50
        ${showTopBtn ? "opacity-100 visible" : "opacity-0 invisible"}
        ${position}`}
      onClick={goToTopWindow}
      style={{
        bottom: "90px",
      }}
    >
      <ArrowUpIcon className="w-5 h-5 stroke-white" />
    </button>
  );
};

export default BackToTop;
