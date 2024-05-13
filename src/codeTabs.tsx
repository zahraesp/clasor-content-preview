import React, { useEffect, useState } from "react";
import SyntaxHighLighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import "./tailwind.css";

declare interface IProps {
  languages: {
    title: string;
    code: string;
  }[];
  link: string | null;
}

const CodeTabs = (props: IProps) => {
  const { languages, link } = props;
  const [value, setValue] = React.useState(0);
  const [mode, setMode] = useState<"pdf" | "default">("default");
  const [expand, setExpand] = useState(false);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleToggle = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      const pdfFlag = localStorage.getItem("CLASOR_PDF_FLAG");
      if (!pdfFlag) return;

      if (JSON.parse(pdfFlag)) {
        setMode("pdf");
      } else {
        setMode("default");
      }
    });
  }, []);

  if (mode === "pdf") {
    return (
      <div className="clasor-code-container pdf-mode">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="clasor-code-link"
          >
            نمونه کد
          </a>
        ) : null}
        {languages.map((lang, index) => {
          return (
            <div key={`lang-${lang.title}-${index}`}>
              <div
                className="clasor-code-item active"
                // eslint-disable-next-line react/no-array-index-key
                key={`code-snippet${index}`}
              >
                <span>{lang.title}</span>
              </div>
              <div className="clasor-code-content">
                <SyntaxHighLighter language={lang.title} style={vs2015}>
                  {lang.code}
                </SyntaxHighLighter>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="clasor-code-container">
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="clasor-code-link"
        >
          نمونه کد
        </a>
      ) : null}
      <div className="clasor-code-tab">
        {languages.map((lang, index) => {
          return (
            <div
              className={`clasor-code-item ${value === index ? "active" : ""}`}
              // eslint-disable-next-line react/no-array-index-key
              key={`clasor-code-item-${index}`}
              onClick={() => {
                return handleChange(index);
              }}
              role="button"
              tabIndex={0}
            >
              <span>{lang.title}</span>
            </div>
          );
        })}
      </div>
      <div className="clasor-code-content">
        <SyntaxHighLighter
          showInlineLineNumbers
          language={languages[value].title}
          style={vs2015}
          className={`${expand ? "h-max" : "h-40"} !mb-10`}
          customStyle={{
            marginBottom: 24,
          }}
        >
          {languages[value].code}
        </SyntaxHighLighter>

        {languages[value].code.split("\n").length > 5 ? (
          <button
            className="absolute bottom-0 left-0 w-full border-t border-gray-200 bg-gray-100 px-5 py-2.5 text-sm hover:text-gray-900 text-blue-700"
            onClick={() => {
              handleToggle();
            }}
          >
            {expand ? "نمایش کمتر" : "نمایش بیشتر"}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CodeTabs;
