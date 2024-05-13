"use client";

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import CodeTabs from "./codeTabs";
import ChartJs from "./chartJs";
import FileAttachment from "./fileAttachment";
import { EChart } from "./interface/contentPreview.interface";
import { IsJsonString } from "./utils/helpers";
import BackToTop from "./backToTop";
import './tailwind.css';

interface IProps {
  versionId?: number;
}

const RenderClientSideContent: React.FC<IProps> = ({ versionId }) => {
  const rootMap = useRef<Map<Element, any>>(new Map());

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const scrollToTopMain = () => {
    const mainEl = document.querySelectorAll("main")?.[0] as HTMLElement;
    mainEl?.scrollTo(0, 0);
  };

  const renderComponent = (element: Element, component: JSX.Element) => {
    let root = rootMap.current.get(element);
    if (!root) {
      root = ReactDOM.createRoot(element);
      rootMap.current.set(element, root);
    }
    root.render(component);
  };

  const getCodeSnippets = () => {
    const codeSnippet = document.querySelectorAll(
      ".clasor-code-snippet",
    ) as any;
    for (const docElement of codeSnippet) {
      if (docElement) {
        docElement.setAttribute("style", "");
        let codeContent = docElement.dataset.code;
        if (codeContent && IsJsonString(codeContent)) {
          codeContent = codeContent.replaceAll("<-h", "<h");
          const jsonLanguages = JSON.parse(codeContent);
          const link = docElement.dataset.link || "";
          renderComponent(
            docElement,
            <CodeTabs languages={jsonLanguages} link={link} />,
          );
          docElement.dataset.code = "";
        }
      }
    }
  };

  const getCharts = () => {
    const chartJsElements = document.querySelectorAll(
      ".chartjs",
    ) as any;
    for (const element of chartJsElements) {
      if (element) {
        element.setAttribute("style", "");
        const chartData = element.dataset.chart as EChart;
        const chartHeight = element.dataset.chartHeight || "";
        const chartValue = element.dataset.chartValue || "";
        if (chartData && chartHeight && chartValue) {
          renderComponent(
            element,
            <ChartJs
              type={chartData}
              height={Number.parseInt(chartHeight, 10)}
              data={JSON.parse(chartValue)}
            />,
          );
        }
      }
    }
  };

  const getFileAttachments = () => {
    const attachedFileInfo = document.querySelectorAll(
      ".clasor-attach-file",
    ) as any;
    for (const attachedFile of attachedFileInfo) {
      if (attachedFile) {
        attachedFile.setAttribute("style", "");
        const fileHash = attachedFile.dataset.clasorHash || "";
        const fileName = attachedFile.dataset.name || "";
        const fileExtension = attachedFile.dataset.extension || "";
        if (fileHash && fileName && fileExtension) {
          renderComponent(
            attachedFile,
            <FileAttachment
              fileName={fileName}
              fileHash={fileHash}
              fileExtension={fileExtension}
            />,
          );
        }
      }
    }
  };

  useEffect(() => {
    scrollToTopMain();
  }, [versionId]);

  useEffect(() => {
    getCodeSnippets();
    getFileAttachments();
    getCharts();
  }, []);

  return (
    <BackToTop
      elementToScrollClass=".scroller"
      position="bottom-20 left-10"
    />
  );
};

export default RenderClientSideContent;
