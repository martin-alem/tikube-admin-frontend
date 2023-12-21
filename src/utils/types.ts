import { LogLevel, PaginationDirection } from "./enum.ts";

export interface IPair {
  id: string;
  name: string;
}

export interface ISelectInputProp {
  label?: string;
  list: IPair[];
  onChange: (selectedItem: IPair) => void;
}

export interface IToggleProp {
  label?: string;
  onChange: (enabled: boolean) => void;
}

export interface IPaginationProp {
  start: number;
  end: number;
  total: number;
  update: (direction: PaginationDirection) => void;
}

export interface ILog {
  id: number;
  logLevel: LogLevel;
  source: string;
  message: string;
  createdAt: string;
  updateAt: string;
}

export interface ILogResult {
  data: ILog[];
  total: number;
}

export interface ILogQueryPayload {
  limit: number;
  offset: number;
}

export interface IServerError {
  message: string;
  path: string;
  method: string;
  statusCode: number;
  timeStamp: number;
}
