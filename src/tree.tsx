import React from "react";
import Nodes from "./nodes";
import { IOutline } from "./interface/contentPreview.interface";

declare interface IProps {
  list: IOutline[];
  shrink?: boolean;
  setActiveLink?: (id: string) => void;
  activeId?: string;
}

const Tree = (props: IProps) => {
  const { list, shrink, activeId, setActiveLink } = props;

  return (
    <nav className={shrink ? "shrink" : ""}>
      <ul>
        <Nodes list={list} activeId={activeId} setActiveLink={setActiveLink} />
      </ul>
    </nav>
  );
};

export default React.memo(Tree);
