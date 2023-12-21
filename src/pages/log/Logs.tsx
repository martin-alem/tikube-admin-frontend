import Toggle from "../../component/toggle/Toggle.tsx";
import SelectInput from "../../component/selectInput/SelectInput.tsx";
import Pagination from "../../component/pagination/Pagination.tsx";
import { JSX, useEffect, useState } from "react";
import { LogLevelSort, PAGE_LIMIT } from "../../utils/constant.ts";
import { PaginationDirection } from "../../utils/enum.ts";
import { ILog, IPair } from "../../utils/types.ts";
import { classNames, handleServerError } from "../../utils/helper.ts";
import { useGetLogsQuery } from "../../services/logsApi.ts";
import { toast } from "react-toastify";
import Shimmer from "../../component/shimmer/Shimmer.tsx";

export default function Logs(): JSX.Element {
  const [totalResults, setTotalResult] = useState<number>(100);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(
    Math.min(startPage - 1 + PAGE_LIMIT, totalResults),
  );
  const [logs, setLogs] = useState<ILog[]>([]);

  const updatePage = (direction: PaginationDirection): void => {
    const newOffset: number =
      pageOffset +
      (direction === PaginationDirection.NEXT ? PAGE_LIMIT : -PAGE_LIMIT);
    if (newOffset < 0 || newOffset >= totalResults) return; // Boundary check

    setPageOffset(newOffset);
    setStartPage(newOffset + 1);
    setEndPage(Math.min(newOffset + PAGE_LIMIT, totalResults));
  };

  const onItemSelected = (item: IPair): void => {
    console.log(item);
  };

  const onToggle = (enabled: boolean): void => {
    console.log(enabled);
  };

  const {
    data: dataFetchLogs,
    error: errorFetchLogs,
    isError: isErrorFetchLogs,
    isSuccess: isSuccessFetchLogs,
    isLoading: isLoadingFetchLogs,
    isFetching: isFetchingFetchLogs,
  } = useGetLogsQuery({
    limit: PAGE_LIMIT,
    offset: pageOffset,
  });

  useEffect(() => {
    if (isSuccessFetchLogs) {
      setLogs(dataFetchLogs.logs);
      setTotalResult(dataFetchLogs.total);
    }
  }, [isSuccessFetchLogs, dataFetchLogs]);

  useEffect(() => {
    if (isErrorFetchLogs && errorFetchLogs) {
      const { message } = handleServerError(errorFetchLogs);
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }, [isErrorFetchLogs, errorFetchLogs]);

  return (
    <>
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sticky top-0 z-1 bg-white bg-opacity-75 py-3.5 backdrop-blur backdrop-filter sm:flex sm:justify-between">
              <div className="w-1/5">
                <SelectInput
                  label={"Sort"}
                  list={LogLevelSort}
                  onChange={onItemSelected}
                />
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <Toggle onChange={onToggle} label={"Live Logs"} />
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle">
                  <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="sticky top-20 z-1 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-2xl font-black text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                        >
                          Level
                        </th>
                        <th
                          scope="col"
                          className="sticky top-20 z-1 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-2xl font-black text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                        >
                          Source
                        </th>
                        <th
                          scope="col"
                          className="sticky top-20 z-1 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-2xl font-black text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                        >
                          Message
                        </th>
                        <th
                          scope="col"
                          className="sticky top-20 z-1 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-2xl font-black text-gray-900 backdrop-blur backdrop-filter"
                        >
                          Timestamp
                        </th>
                      </tr>
                    </thead>
                    {isLoadingFetchLogs || isFetchingFetchLogs ? (
                      <tbody>
                        <tr>
                          <td colSpan={4}>
                            {/* Adjust the number 4 to match the total number of columns */}
                            <Shimmer count={100} />
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {logs.map((log) => (
                          <tr key={log.id}>
                            <td
                              className={classNames(
                                log.id !== logs.length - 1
                                  ? "border-b border-gray-200"
                                  : "",
                                "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8",
                              )}
                            >
                              {log.source}
                            </td>
                            <td
                              className={classNames(
                                log.id !== logs.length - 1
                                  ? "border-b border-gray-200"
                                  : "",
                                "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell",
                              )}
                            >
                              {log.message}
                            </td>
                            <td
                              className={classNames(
                                log.id !== logs.length - 1
                                  ? "border-b border-gray-200"
                                  : "",
                                "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell",
                              )}
                            >
                              {log.createdAt}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                  {logs.length > 0 ? (
                    <Pagination
                      end={endPage}
                      start={startPage}
                      total={totalResults}
                      update={updatePage}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
