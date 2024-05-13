import React, { Fragment, useState } from "react";
import { IOutline } from "./interface/contentPreview.interface";
import Tree from "./tree";

interface IProps {
  outline: string;
}

const Outline: React.FC<IProps> = ({ outline }: IProps) => {
  const [shrink, setShrink] = useState<string[]>([]);
  const [activeId, setActiveLink] = useState("");

  const handleShrink = (key: string) => {
    if (shrink.includes(key)) {
      setShrink(
        shrink.filter((item) => {
          return item !== key;
        }),
      );
    } else {
      setShrink([...shrink, key]);
    }
  };

  let outlineList: any;
  try {
    outlineList = JSON.parse(outline);
  } catch {
    outlineList = [];
  }

  return (
    <div className="clasor-outline container min-w-[300px] p-6">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-2xl">نمای کلی</h3>
      </div>

      <div className="scrollable-outline">
        {outlineList.constructor === Array ? (
          <Tree
            activeId={activeId}
            setActiveLink={setActiveLink}
            list={outlineList}
          />
        ) : (outlineList.constructor === Object ? (
          Object.keys(outlineList).map((key) => {
            const list = (
              outlineList as {
                [index: string]: IOutline[];
              }
            )[key] as IOutline[];
            return (
              <Fragment key={key}>
                <span
                  className="clasor-tree-label"
                  onClick={() => {
                    return handleShrink(key);
                  }}
                  role="menuitem"
                  tabIndex={0}
                >
                  {key === "root" ? "نمای اصلی" : key}
                </span>
                <Tree
                  activeId={activeId}
                  setActiveLink={setActiveLink}
                  list={list}
                  shrink={shrink.includes(key)}
                />
              </Fragment>
            );
          })
        ) : null)}
      </div>
    </div>
  );
};

export default Outline;
