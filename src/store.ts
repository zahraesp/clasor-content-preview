import { InitialStateType } from "./interface/contentPreview.interface";

const initial: InitialStateType = {
  podSpaceServer: "",
  frontendServer: "",
  content: "",
  outline: "[]",
};

let inline = false;

let handleError = (error: any) => {
  const log = JSON.stringify(error);
};

let handleShareFile:
  | ((fileHash: string, userGroupHash: string) => Promise<boolean>)
  | null = null;

let handleRefreshToken: (() => Promise<string>) | null = null;
let onChange: ((content: string) => void) | null;

export const getValue = (key: keyof InitialStateType) => {
  return initial[key];
};

export const setValue = (key: keyof InitialStateType, value: string) => {
  initial[key] = value;
};

export const getErrorHandler = () => {
  return handleError;
};

export const getHandleShareFile = () => {
  return handleShareFile;
};

export const getHandleRefreshToken = () => {
  return handleRefreshToken;
};

export const getInlineEditor = () => {
  return inline;
};

export const setInlineEditor = (isInline: boolean) => {
  inline = isInline;
};

export const setErrorHandler = (handler: (error: any) => void) => {
  handleError = handler;
};

export const setHandleShareFile = (
  handler: (fileHash: string, userGroupHash: string) => Promise<boolean>,
) => {
  handleShareFile = handler;
};

export const setHandleRefreshToken = (handler: () => Promise<string>) => {
  handleRefreshToken = handler;
};

export const setHandleOnChane = (handler: (content: string) => void) => {
  onChange = handler;
};

export const getHandleChange = () => {
  return onChange;
};
