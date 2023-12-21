import { JSX } from "react";
import { IPaginationProp } from "../../utils/types.ts";
import { PaginationDirection } from "../../utils/enum.ts";

export default function Pagination({
  start,
  end,
  total,
  update,
}: IPaginationProp): JSX.Element {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{start}</span> to{" "}
          <span className="font-medium">{end}</span> of{" "}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <div
          onClick={() => update(PaginationDirection.PREV)}
          className="relative inline-flex items-center cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Previous
        </div>
        <div
          onClick={() => update(PaginationDirection.NEXT)}
          className="relative ml-3 inline-flex cursor-pointer items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Next
        </div>
      </div>
    </nav>
  );
}
