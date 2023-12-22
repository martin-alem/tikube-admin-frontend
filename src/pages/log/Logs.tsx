import SelectInput from "../../component/selectInput/SelectInput.tsx";
import { JSX, useEffect, useState } from "react";
import { LogLevelSort, PAGE_LIMIT } from "../../utils/constant.ts";
import { PaginationDirection } from "../../utils/enum.ts";
import { ILog, IPair } from "../../utils/types.ts";
import { handleServerError } from "../../utils/helper.ts";
import { useGetLogsQuery } from "../../services/logsApi.ts";
import { toast } from "react-toastify";
import { format } from "date-fns";
import TextInput from "../../component/input/TextInput.tsx";
import Pagination from "../../component/pagination/Pagination.tsx";
import Shimmer from "../../component/shimmer/Shimmer.tsx";

export default function Logs(): JSX.Element {
  const [totalResults, setTotalResult] = useState<number>(0);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(PAGE_LIMIT);
  const [logs, setLogs] = useState<ILog[]>([]);
  const [levelFilter, setLevelFilter] = useState<string>("");
  const [fromDateFilter, setFromDateFilter] = useState<string>("");
  const [toDateFilter, setToDateFilter] = useState<string>("");

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
    setLevelFilter(item.id);
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
    levelFilter: levelFilter,
    dateFilter:
      fromDateFilter && toDateFilter ? `${fromDateFilter},${toDateFilter}` : "",
  });

  useEffect(() => {
    if (isSuccessFetchLogs) {
      setLogs(dataFetchLogs.data);
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
        <div className="">
          <div className="">
            <div className="sticky top-0 z-10 bg-white bg-opacity-75 px-6 py-3.5 backdrop-blur backdrop-filter sm:flex sm:justify-between sm:items-center">
              <div className="w-1/5">
                <SelectInput
                  label={"Filter by level"}
                  list={LogLevelSort}
                  onChange={onItemSelected}
                />
              </div>
              <div className="w-1/5">
                <TextInput
                  id={"from"}
                  value={fromDateFilter}
                  handleOnChange={(e) => setFromDateFilter(e.target.value)}
                  handleOnBlur={() => {}}
                  type={"date"}
                  label={"From"}
                />
              </div>
              <div className="w-1/5">
                <TextInput
                  id={"to"}
                  value={toDateFilter}
                  handleOnChange={(e) => setToDateFilter(e.target.value)}
                  handleOnBlur={() => {}}
                  type={"date"}
                  label={"To"}
                />
              </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                          >
                            Level
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Source
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Message
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Timestamp
                          </th>
                        </tr>
                      </thead>
                      {isLoadingFetchLogs || isFetchingFetchLogs ? (
                        <tbody>
                          <tr>
                            <td colSpan={4}>
                              <Shimmer count={15} />
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {logs.map((log) => (
                            <tr key={log.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                {log.logLevel}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {log.source}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {log.message}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {format(
                                  new Date(log.createdAt),
                                  "MM/dd/yyyy HH:mm:ss a",
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                    {totalResults > 0 ? (
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
        </div>
      </main>
    </>
  );
}
