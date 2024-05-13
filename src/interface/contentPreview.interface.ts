export enum EChart {
  line = "line",
  bar = "bar",
  horizontalBar = "horizontalBar",
  radar = "radar",
  doughnut = "doughnut",
  polar = "polar",
  bubble = "bubble",
  pie = "pie",
  scatter = "scatter",
}

export interface IRefClasorEditor {
  getData: () => {
    content: string;
    outline: string;
  };
}

export interface IUserInfo {
  id: number;
  name: string | null;
  isOwner: boolean;
}

export interface ClasorEditorProps {
  mode: "EDIT" | "PREVIEW";
  content: string;
  outline?: string;
  podSpaceServer: string;
  frontendServer?: string;
  token?: string;
  publicUserGroupHash?: string;
  privateUserGroupHash?: string;
  userInfo?: IUserInfo;
  inline?: boolean;
  handleError?: (error: Error) => void;
  handleShareFile?: (
    fileHash: string,
    userGroupHash: string
  ) => Promise<boolean>;
  handleRefreshToken?: () => Promise<string>;
  onChange?: (content: string) => void;
  getEditorValue?: () => string;
  ref?: React.MutableRefObject<IRefClasorEditor | null>;
}

export type InitialStateType = Omit<
  ClasorEditorProps,
  | "handleError"
  | "handleShareFile"
  | "handleRefreshToken"
  | "mode"
  | "getEditorValue"
  | "ref"
  | "inline"
  | "userInfo"
  | "onChange"
> & { userInfo?: string };

export interface IOutline {
  id: string;
  level: number;
  tag: string;
  text: string;
  children: IOutline[];
}

export interface IGetSpecificVersion {
  id: number;
  documentId: number;
  documentTitle: string;
  repoId: number;
  versionNumber: string;
  postId: number;
  createDate: number;
  updateDate: number;
  status: "accepted";
  changeLog: string;
  content: string;
  outline: string;
  metadata: "";
  likeCount: number;
  dislikeCount: number;
  shareCount: number;
  favoriteCount: number;
  commentCount: number;
  state: "public";
}