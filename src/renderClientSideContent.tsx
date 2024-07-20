'use client';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import CodeTabs from './codeTabs';
import ChartJs from './chartJs';
import FileAttachment from './fileAttachment';
import { EChart } from './interface/contentPreview.interface';
import { IsJsonString } from './utils/helpers';
import BackToTop from './backToTop';
import RenderSwagger from './renderSwagger';

interface IProps {
  versionId?: number;
  podSpaceServer?: string;
}

let timeOut: number;
const RenderClientSideContent: React.FC<IProps> = ({
  versionId,
  podSpaceServer,
}) => {
  const rootMap = useRef<Map<Element, any>>(new Map());

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const scrollToTopMain = () => {
    const mainEl = document.querySelectorAll('main')?.[0] as HTMLElement;
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
      '.clasor-code-snippet'
    ) as any;
    for (const docElement of codeSnippet) {
      if (docElement) {
        docElement.setAttribute('style', '');
        let codeContent = docElement.dataset.code;
        if (codeContent && IsJsonString(codeContent)) {
          codeContent = codeContent.replaceAll('<-h', '<h');
          const jsonLanguages = JSON.parse(codeContent);
          const link = docElement.dataset.link || '';
          renderComponent(
            docElement,
            <CodeTabs languages={jsonLanguages} link={link} />
          );
          docElement.dataset.code = '';
        }
      }
    }
  };

  const getCharts = () => {
    const chartJsElements = document.querySelectorAll('.chartjs') as any;
    for (const element of chartJsElements) {
      if (element) {
        element.setAttribute('style', '');
        const chartData = element.dataset.chart as EChart;
        const chartHeight = element.dataset.chartHeight || '';
        const chartValue = element.dataset.chartValue || '';
        if (chartData && chartHeight && chartValue) {
          renderComponent(
            element,
            <ChartJs
              type={chartData}
              height={Number.parseInt(chartHeight, 10)}
              data={JSON.parse(chartValue)}
            />
          );
        }
      }
    }
  };

  const getFileAttachments = () => {
    const attachedFileInfo = document.querySelectorAll(
      '.clasor-attach-file'
    ) as any;
    for (const attachedFile of attachedFileInfo) {
      if (attachedFile) {
        attachedFile.setAttribute('style', '');
        const fileHash = attachedFile.dataset.clasorHash || '';
        const fileName = attachedFile.dataset.name || '';
        const fileExtension = attachedFile.dataset.extension || '';
        if (fileHash && fileName && fileExtension) {
          renderComponent(
            attachedFile,
            <FileAttachment
              fileName={fileName}
              fileHash={fileHash}
              fileExtension={fileExtension}
              podSpaceServer={podSpaceServer}
            />
          );
        }
      }
    }
  };

  const getSwaggers = () => {
    const swaggerList = document.getElementsByClassName('swagger');
    if (swaggerList && swaggerList.length) {
      for (let i = 0; i < swaggerList.length; ++i) {
        const swaggerEl = swaggerList[i] as HTMLElement;
        if (swaggerEl) {
          swaggerEl.removeAttribute('style');
          swaggerEl.setAttribute('style', '');
          swaggerEl.style.border = 'none';
          swaggerEl.style.background = 'none';
          const swaggerLink = swaggerEl.getAttribute('swagger-link');
          const swaggerTitle = swaggerEl.getAttribute('swagger-title');
          const swaggerPath = swaggerEl.getAttribute('swagger-path');
          const swaggerMethod = swaggerEl.getAttribute('swagger-method');

          if (swaggerTitle && swaggerLink && swaggerPath && window) {
            renderComponent(
              swaggerEl,
              <RenderSwagger
                title={swaggerTitle}
                link={swaggerLink || ''}
                path={swaggerPath}
                method={swaggerMethod}
              />
            );
          }
        }
      }
    }
  };

  const getCurls = () => {
    const curls = document.getElementsByClassName('curl');

    if (curls && curls.length) {
      for (let i = 0; i < curls.length; ++i) {
        const docElement = curls[i] as HTMLElement;
        if (docElement) {
          docElement.removeAttribute('style');
          docElement.setAttribute('style', '');
          docElement.style.border = 'none';
          docElement.style.background = 'none';
          let codeContent = docElement.getAttribute('data-code');
          if (codeContent && IsJsonString(codeContent) && window) {
            codeContent = codeContent.replace(/<-h/g, '<h');
            const jsonLanguages = JSON.parse(codeContent);
            renderComponent(
              docElement,
              <CodeTabs languages={jsonLanguages} link={null} />
            );
          }
        }
      }
    }
  };

  const getInnerDocument = () => {
    const externalDoc = document.querySelectorAll('.clasor-external-document');

    const editBtn = document.querySelectorAll('.external-document-edit-btn');

    const deleteBtn = document.querySelectorAll(
      '.external-document-delete-btn'
    );

    if (editBtn.length) {
      for (let i = 0; i < editBtn.length; ++i) {
        (editBtn[i] as any).style.display = 'none';
      }
    }
    if (deleteBtn.length) {
      for (let i = 0; i < deleteBtn.length; ++i) {
        (deleteBtn[i] as any).style.display = 'none';
      }
    }

    if (externalDoc.length) {
      for (let i = 0; i < externalDoc.length; ++i) {
        const documentContent = externalDoc[i].getAttribute('data-content');
        if (documentContent) {
          externalDoc[i].innerHTML = documentContent;
        }
      }
    }
  };

  useEffect(() => {
    scrollToTopMain();
  }, [versionId]);

  useEffect(() => {
    clearTimeout(timeOut);
    timeOut = window.setTimeout(() => {
      getCodeSnippets();
      getFileAttachments();
      getCharts();
      getSwaggers();
      getCurls();
      getInnerDocument();
    }, 100);
  }, []);

  return (
    <BackToTop elementToScrollClass=".scroller" position="bottom-20 left-10" />
  );
};

export default RenderClientSideContent;
