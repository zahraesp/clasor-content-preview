import React from 'react';
import { IGetSpecificVersion } from './interface/contentPreview.interface';

interface IProps {
  versionData: string | IGetSpecificVersion;
  className?: string;
}

const RenderServerSideContent: React.FC<IProps> = ({ versionData, className }: IProps) => {
  return (
    <div className={`clasor-preview-content ${className ? className : ""}`}>
      <div
        className="clasor-preview-content__render-server-content"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: typeof(versionData) === "string" ? versionData : versionData.content,
        }}
      />
    </div>
  );
};

export default RenderServerSideContent;
