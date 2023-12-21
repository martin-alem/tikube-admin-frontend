import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IServerError } from "./types.ts";
import { INTERNAL_SERVER_ERROR } from "./constant.ts";

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function handleServerError(
  error: FetchBaseQueryError | SerializedError | undefined,
): { statusCode: number; message: string } {
  if (error && "data" in error) {
    const serverError = error["data"] as IServerError;
    if (serverError.statusCode !== 500)
      return {
        statusCode: serverError.statusCode,
        message: serverError.message,
      };
  }
  return { statusCode: 500, message: INTERNAL_SERVER_ERROR };
}
