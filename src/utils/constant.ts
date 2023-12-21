import { IPair } from "./types.ts";

export const PAGE_LIMIT = 10;

export const LogLevelSort: IPair[] = [
  { id: "warn", name: "WARN" },
  { id: "info", name: "INFO" },
  { id: "error", name: "ERROR" },
  { id: "fatal", name: "FATAL" },
];

export const INTERNAL_SERVER_ERROR: string =
  "Something went wrong. Please try again later";
