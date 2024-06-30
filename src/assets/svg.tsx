import React from "react";

interface IProps {
  className?: string;
  viewBox?: string;
}

export const ArrowUpIcon = (props: IProps) => {
  const { className, viewBox } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={viewBox ?? "0 0 24 24"}
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>
  );
};

export const ChevronDownIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9958 10.0008C17.9965 10.1324 17.9713 10.2629 17.9216 10.3847C17.8718 10.5065 17.7985 10.6174 17.7058 10.7108L12.7058 15.7108C12.5184 15.897 12.265 16.0016 12.0008 16.0016C11.7366 16.0016 11.4831 15.897 11.2958 15.7108L6.29578 10.7108C6.20205 10.6178 6.12767 10.5072 6.0769 10.3854C6.02614 10.2635 6 10.1328 6 10.0008C6 9.86878 6.02614 9.73808 6.0769 9.61622C6.12767 9.49436 6.20205 9.38376 6.29578 9.29079C6.48314 9.10454 6.73661 9 7.00079 9C7.26498 9 7.51845 9.10454 7.70581 9.29079L11.9958 13.5908L16.2958 9.29079C16.4831 9.10454 16.7366 9 17.0008 9C17.265 9 17.5184 9.10454 17.7058 9.29079C17.7985 9.38423 17.8718 9.49505 17.9216 9.61689C17.9713 9.73873 17.9965 9.86919 17.9958 10.0008Z"
        fill="currentColor;"
      />
    </svg>
  );
};