import { LogLevel, PaginationDirection } from "./enum.ts";
import React, { ReactNode } from "react";

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
  levelFilter: string;
  dateFilter: string;
}

export interface IServerError {
  message: string;
  path: string;
  method: string;
  statusCode: number;
  timeStamp: number;
}

export interface ITextInputProp {
  id: string;
  type?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  prefixIcon?: ReactNode;
  value?: string;
  capitalize?: boolean;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
}
