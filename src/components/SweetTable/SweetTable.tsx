import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Row,
  useTable,
  useGlobalFilter,
  useFilters,
  useAsyncDebounce,
  usePagination,
} from "react-table";
import { cla } from "src/App";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";

import searchSvgPath from "src/styling-constants/svg-items/search.svg";
// import { ReactComponent as ArrowRightSvg } from "src/styling-constants/svg-items/arrow-right.svg";

import { createUseStyles } from "react-jss";
import AnimateHeight from "react-animate-height";
import { useResizeDetector } from "react-resize-detector";

import style from "./SweetTable.module.scss";
import { Classes } from "jss";
import { capitalizeFirstLetter, DatingNamesEnum } from "src/app/helper-functions";

// import { StatusFilter } from "./StatusFilter";
// import { DateFilter } from "./DateFilter";
import { SweetDrop } from "../SweetDrop/SweetDrop";
import { useTranslation } from "react-i18next";
import { SweetArrow } from "../SweetDrop/SweetArrow";
import { IDropItem } from "src/app/interfaces";
import { Paginate } from "../Paginate/Paginate";

export interface IMyCell {
  value: string | boolean;
  row: { id: string; index: number };
  column: { Header: string };
  tableIsNarrow?: boolean;
}

export type FilterFnOfTableT = (
  rows: {
    allCells: any[];
    cells: any[];
    depth: number;
    id: string;
    index: number;
    original: { [key: string]: any };
    values: { [key: string]: any };
  }[],
  columnIds: string[],
  filterValue: any,
) => any[];

export interface IMyColumn {
  Header: Exclude<ReactNode | (() => ReactNode), null>;
  accessor: string;
  Cell?: (cell: IMyCell) => ReactNode;

  prioritizedStyles: {
    minWidth: number;
    flexGrow: number;
  };

  filter?: FilterFnOfTableT;
}

export type MyColumnsT = IMyColumn[];

export interface IMyRow {
  [key: string]: ReactNode;
}

export type MyTableDataT = IMyRow[];

export interface ICustomTopBottom {
  row: Row<IMyRow>;
  columns: MyColumnsT;
  payload: any;
}

export interface IStylingObjectForNpmReactJss {
  [key: string]: React.CSSProperties | undefined; // key will be part of the classname string
}

const useSweetNpmReactJss = (tableColumns: MyColumnsT) => {
  // stylingObject example:
  /*
  const stylingObjectExample = {
    wrapper: {
      padding: 40,
      background: "red",
      textAlign: "left",
    },
    title: {
      font: {
        size: 40,
        weight: 900,
      },
      color: "red",
    },
    link: {
      color: "blue",
      "&:hover": {
        opacity: 0.5,
      },
    },
  };
  */

  const classNamesForEachColumnWidth = () => {
    const initObj: { [key: string]: Classes<string> } = {};
    tableColumns.forEach((x) => {
      const id = x.accessor;
      const minWidth = x.prioritizedStyles.minWidth;
      const flexGrow = x.prioritizedStyles.flexGrow;

      const npmReactJssStylingObject = {
        cell: {
          // flexBasis: `${currPrioritizedStyles.minWidth}px`,
          width: `${minWidth}px`,
          flexGrow: flexGrow,
          // flexGrow: 0,
          // border: "1px solid green",
        },
      };

      const getClasses = createUseStyles(npmReactJssStylingObject, { name: style.uni });
      const classes = getClasses();

      initObj[id] = classes;
    });

    return initObj;
  };

  const theClasses = classNamesForEachColumnWidth();

  return { classNamesForEachColWidth: theClasses };
};

export const SweetTable: React.FC<{
  className?: string;
  tableColumns: MyColumnsT;
  columnsToHideInPureFlowForNarrowTable?: string[];
  tableData: MyTableDataT;
  RowsAreCollapsedInitiallyForNarrowTable?: boolean;
  narrowHasCollapseExpandButton: boolean;
  narrowRowTopBoxContentMaker?: React.FC<ICustomTopBottom>;
  narrowRowBottomBoxContentMaker?: React.FC<ICustomTopBottom>;
  eachPageSize?: number;
  changeEachPageSize: (num: number) => any;
  idsOfDatings?: DatingNamesEnum[];
}> = ({
  className,
  tableColumns,
  columnsToHideInPureFlowForNarrowTable = [],
  tableData,
  RowsAreCollapsedInitiallyForNarrowTable = true,
  narrowHasCollapseExpandButton,
  narrowRowTopBoxContentMaker,
  narrowRowBottomBoxContentMaker,
  eachPageSize = 8,
  changeEachPageSize,
  idsOfDatings = [DatingNamesEnum.all],
}) => {
  const basicMinHeight = eachPageSize * 56;
  const numberOfCols = tableColumns.length;
  const widthBreakPoint =
    tableColumns.reduce((accu, item) => accu + item.prioritizedStyles.minWidth, 0) +
    numberOfCols * 5 * 2 +
    8;

  const { t } = useTranslation();

  const idOfLastVisibleColumnForNarrowTable = useMemo(() => {
    const arrOfIsVisible = tableColumns.filter(
      (x) => !columnsToHideInPureFlowForNarrowTable.includes(x.accessor),
    );
    const lastId = arrOfIsVisible[arrOfIsVisible.length - 1].accessor;
    return lastId;
  }, [columnsToHideInPureFlowForNarrowTable, tableColumns]);

  const {
    ref: tableRef,
    width: tableWidth,
  }: {
    ref: React.MutableRefObject<HTMLTableElement | null>;
    height?: number;
    width?: number;
  } = useResizeDetector();

  const recentlyInitPage = useRef(true);

  useLayoutEffect(() => {
    setTimeout(() => {
      recentlyInitPage.current = false;
    }, 300);
  }, []);

  const tableIsNarrow = useMemo(() => {
    const offsetWidth = tableRef.current?.offsetWidth;
    // console.log("offsetWidth222222222221:::", offsetWidth);
    if (!offsetWidth) {
      return false;
    }

    if (offsetWidth <= widthBreakPoint) {
      return true;
    } else {
      return false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableWidth, widthBreakPoint]);

  const tableIsNarrowRef = useRef(tableIsNarrow);
  tableIsNarrowRef.current = tableIsNarrow;

  const tableInstance = useTable(
    {
      columns: tableColumns,
      data: tableData,
      // @ts-ignore
      initialState: { pageSize: eachPageSize },
    },
    useFilters,
    useGlobalFilter,
    usePagination,
  );

  const {
    state,

    // @ts-ignore
    setGlobalFilter,

    // @ts-ignore
    setFilter,
  } = tableInstance;

  const {
    // globalFilter,

    // @ts-ignore
    filters,
  } = state;
  // console.log(filters);

  // @ts-ignore
  // const pageIndex: number | null | undefined = state.pageIndex; // ::-:
  // const { pageSize } = state as any;

  // const currPage = typeof pageIndex === "number" ? pageIndex + 1 : undefined; // ::-:

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,

    prepareRow,
  } = tableInstance;

  const {
    nextPage,
    previousPage,
    // canPreviousPage, // ::-:
    // canNextPage, // ::-:
    gotoPage, // (updater: ((pageIndex: number) => number) | number) => void;
    // pageOptions,
    // pageCount, // ::-:
    // setPageSize,
  } = tableInstance as any;
  const page: Row<IMyRow>[] = (tableInstance as any).page;

  const cl_narrowTable_wideTable = tableIsNarrow ? style.narrowTable : style.wideTable;

  const rowsAreCollapsed = tableIsNarrow && RowsAreCollapsedInitiallyForNarrowTable;

  const collapsingMapFn = useCallback(() => {
    const myMap = tableData.map((x, i) => {
      let value = rowsAreCollapsed;
      if (i === 0) {
        value = false;
      }

      return value;
    });
    return myMap;
  }, [rowsAreCollapsed, tableData]);

  const [mapOfCollapsedRows, setMapOfCollapsedRows] = useState(tableData.map((x) => false));

  const collapsingMapFnRef = useRef(collapsingMapFn);
  collapsingMapFnRef.current = collapsingMapFn;

  useLayoutEffect(() => {
    let timer = setTimeout(() => {
      setMapOfCollapsedRows(collapsingMapFnRef.current());
    }, 400);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [rowsAreCollapsed]);

  // const maxHeightMapRef = useRef({
  //   pureFlowItems: tableData.map((x) => "auto" as number | "auto"),
  // });

  const toggleRowCollapsing = useCallback((rowInd: number) => {
    setMapOfCollapsedRows((prev) => {
      const newArr = [...prev];
      newArr[rowInd] = !newArr[rowInd];
      return newArr;
    });
  }, []);

  //

  // useLayoutEffect(() => {
  //   tableData.forEach((row, rowInd) => {
  //     const currH = getHeightOfPureFlow(rowInd);
  //     maxHeightMapRef.current.pureFlowItems[rowInd] = currH;
  //   });
  // });

  const { classNamesForEachColWidth } = useSweetNpmReactJss(tableColumns);

  // const drawing = useMemo(() => {
  //   return {
  //     initializing: style.initializing,
  //     drawn: style.drawn,
  //   };
  // }, []);

  // const [cl_initializing_drawn, setCl_initializing_drawn] = useState(drawing.initializing);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCl_initializing_drawn(drawing.drawn);
  //   }, 200);
  // }, [drawing.drawn]);

  const [headerAniHeight, setHeaderAniHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    const updateHeaderAni = () => {
      if (tableIsNarrowRef.current) {
        setHeaderAniHeight(0);
      } else {
        setHeaderAniHeight("auto");
      }
    };

    let timer: NodeJS.Timeout | undefined | null = undefined;

    if (recentlyInitPage.current) {
      timer = setTimeout(() => {
        updateHeaderAni();
      }, 300);
    }

    if (!recentlyInitPage.current) {
      updateHeaderAni();
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [tableIsNarrow]);

  const changeGloFilterWithDebouncer = useAsyncDebounce((value) => {
    setGlobalFilter(value);
  }, 1000);

  const [searchString, setSearchString] = useState("");

  const searchStringChanger: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newVal = e.target.value;
      setSearchString((prev) => newVal);
      changeGloFilterWithDebouncer(newVal);
    },
    [changeGloFilterWithDebouncer],
  );

  const searchPlaceholder = useMemo(() => {
    let str = "";
    const mySlice = tableColumns.slice(0, 3);
    mySlice.forEach((x, i) => {
      const currW = x.Header;
      if (typeof currW === "string") {
        const finalW = capitalizeFirstLetter(currW.toLowerCase());
        str += finalW;
      } else {
        //
      }

      if (i === mySlice.length - 1) {
        str += "...";
      } else {
        str += ", ";
      }
    });

    return str;
  }, [tableColumns]);

  const idsOfStatuses = useMemo(() => {
    return ["all", "open", "completed"];
  }, []);

  const listOfStatuses = useMemo(() => {
    const arr = idsOfStatuses.map(
      (x) =>
        ({
          content: t(x),
          id: x,
        } as IDropItem),
    );
    return arr;
  }, [idsOfStatuses, t]);

  //
  //

  const statusIndexPrevRef = useRef(-1);

  const currIndexOfStatusFilter: number = useMemo(() => {
    const filt = filters as { id: string; value: string }[];
    const nowStatusFilter = filt.find((x) => x.id === "status")?.value;

    if (!nowStatusFilter) {
      statusIndexPrevRef.current = -1;
      return -1;
    }

    const nowIndex = listOfStatuses.findIndex((x) => x.content === nowStatusFilter);

    if (nowIndex >= 0) {
      statusIndexPrevRef.current = nowIndex;
      return nowIndex;
    } else {
      const currChoice = idsOfStatuses[statusIndexPrevRef.current];
      setTimeout(() => {
        setFilter("status", currChoice === "all" ? "" : t(currChoice));
      }, 50);

      return -1;
    }
  }, [filters, idsOfStatuses, listOfStatuses, setFilter, t]);

  //
  //
  //

  const listOfDatings = useMemo(() => {
    const arr = idsOfDatings.map(
      (x) =>
        ({
          id: x,
          content: t(x),
        } as IDropItem),
    );
    return arr;
  }, [idsOfDatings, t]);

  const datingIndexRef = useRef<number>(-1);
  const datingIndexPrevRef = useRef<number>(-1);
  const datingFilterInitiated = useRef(false);

  useEffect(() => {
    const filt = filters as { id: string; value: number }[];
    const nowDatingFilter = filt.find((x) => x.id === "date")?.value;

    if (!datingFilterInitiated.current && typeof nowDatingFilter === "number") {
      datingFilterInitiated.current = true;
    }

    if (datingFilterInitiated.current && nowDatingFilter === undefined) {
      setTimeout(() => {
        setFilter("date", datingIndexPrevRef.current);
      }, 50);
    }

    datingIndexRef.current = nowDatingFilter || -1;
    if (typeof nowDatingFilter === "number") {
      datingIndexPrevRef.current = nowDatingFilter;
    }
  }, [filters, setFilter]);

  // const [dateDropVisible, setDateDropVisible] = useState(false);
  // const [statusDropVisible, setStatusDropVisible] = useState(false);

  return (
    <div className={cla(className, style.tableWrap, cl_narrowTable_wideTable)}>
      <div className={style.beforeTable}>
        <div className={style.searchBox}>
          <div className={style.searchIconWrap}>
            <img className={style.searchIcon} src={searchSvgPath} alt={"search icon"} />
          </div>
          <input
            className={style.searchInput}
            placeholder={searchPlaceholder}
            value={searchString}
            onChange={searchStringChanger}
          />
        </div>

        <div className={style.otherFilters}>
          {/* <DateFilter setFilter={setFilter} /> */}

          <SweetDrop
            name={t("date") as string}
            optionsArr={listOfDatings}
            currInd={datingIndexRef.current}
            tryToSetNewVal={(index) => {
              // const currChoice = idsOfDatings[index];
              // setFilter("date", currChoice === "all" ? "" : currChoice);
              setFilter("date", index);
            }}
            className={style.dateDropTop}
            classForChoice={style.theChoice}
            currentAsTitle={true}
            // parentalVisible={dateDropVisible}
            // parentalOnChange={(myArg) => {
            //   setDateDropVisible((prev) => {
            //     if (myArg === "justClose") {
            //       return false;
            //     }

            //     if (prev === false) {
            //       setStatusDropVisible(false);
            //     }

            //     return !prev;
            //   });
            // }}
          />

          <SweetDrop
            name={t("status") as string}
            optionsArr={listOfStatuses}
            currInd={currIndexOfStatusFilter}
            tryToSetNewVal={(index) => {
              const currChoice = idsOfStatuses[index];
              setFilter("status", currChoice === "all" ? "" : t(currChoice));
            }}
            className={style.statusDropTop}
            classForChoice={style.theChoice}
            currentAsTitle={true}
            // parentalVisible={statusDropVisible}
            // parentalOnChange={(myArg) => {
            //   setStatusDropVisible((prev) => {
            //     if (myArg === "justClose") {
            //       return false;
            //     }

            //     if (prev === false) {
            //       setDateDropVisible(false);
            //     }

            //     return !prev;
            //   });
            // }}
          />

          {/* <SweetArrow />
          <StatusFilter setFilter={setFilter} /> */}
        </div>
      </div>

      <div
        ref={tableRef}
        className={cla(style.myTable, cl_narrowTable_wideTable)}
        {...getTableProps()}
      >
        <AnimateHeight
          easing={"ease-in-out"}
          duration={800}
          height={headerAniHeight}
          className={cla(style.tHead, cl_narrowTable_wideTable)}
        >
          {headerGroups.map((headerGroup) => (
            <div
              className={cla(style.tHeadRow, cl_narrowTable_wideTable)}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => {
                return (
                  <div
                    className={cla(
                      style.tH,
                      classNamesForEachColWidth[column.id].cell,
                      cl_narrowTable_wideTable,
                    )}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </div>
                );
              })}
            </div>
          ))}
        </AnimateHeight>

        <div
          style={tableIsNarrow ? undefined : { minHeight: `${basicMinHeight}px` }}
          className={cla(style.tBody, cl_narrowTable_wideTable)}
          {...getTableBodyProps()}
        >
          {
            //
            // rows
            page.map((row, rowInd) => {
              prepareRow(row);

              let rowIsCollapsed = mapOfCollapsedRows[rowInd];

              const cl_collapsedRow_expandedRow = rowIsCollapsed
                ? style.collapsedRow
                : style.expandedRow;

              return (
                <div
                  className={cla(style.tRow, cl_narrowTable_wideTable, cl_collapsedRow_expandedRow)}
                  {...row.getRowProps()}
                >
                  {tableIsNarrow && (
                    <div className={cla(style.rowTopBox)}>
                      {narrowRowTopBoxContentMaker && (
                        <div>
                          {narrowRowTopBoxContentMaker({
                            columns: tableColumns,
                            row,
                            payload: undefined,
                          })}
                        </div>
                      )}

                      {narrowHasCollapseExpandButton && tableIsNarrow && (
                        <SweetArrow
                          togglerByParent={{
                            position: rowIsCollapsed ? "toDown" : "toUp",
                            toggleFn: () => toggleRowCollapsing(rowInd),
                          }}
                        />
                      )}
                    </div>
                  )}

                  <AnimateHeight
                    easing={"ease-in-out"}
                    height={mapOfCollapsedRows[rowInd] ? 0 : "auto"}
                    duration={800}
                    className={cla(style.rowBody)}
                  >
                    <div className={cla(style.pureCellFlow, cl_narrowTable_wideTable)}>
                      {row.cells.map((cell, cellInd) => {
                        const columnId = cell.column.id;
                        const cl_hid_visible =
                          tableIsNarrow && columnsToHideInPureFlowForNarrowTable.includes(columnId)
                            ? style.hid
                            : style.visible;

                        const cl_lastVis_notLastVis =
                          idOfLastVisibleColumnForNarrowTable === columnId
                            ? style.lastVis
                            : style.notLastVis;

                        return (
                          <div
                            className={cla(
                              style.tD,
                              classNamesForEachColWidth[columnId].cell,
                              cl_narrowTable_wideTable,
                              cl_hid_visible,
                              cl_lastVis_notLastVis,
                            )}
                            data-label={cell.column.id}
                            {...cell.getCellProps()}
                          >
                            {/* <div className={cla(style.label, narrow)}>{cell.column.Header}</div> */}
                            <div className={cla(style.label, cl_narrowTable_wideTable)}>
                              {cell.column.render("Header")}
                            </div>

                            {/* <div className={cla(style.value, narrow)}>{cell.value}</div> */}
                            <div className={cla(style.value, cl_narrowTable_wideTable)}>
                              {cell.render("Cell")}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {tableIsNarrow && narrowRowBottomBoxContentMaker && (
                      <div className={cla(style.rowBottomBox)}>
                        {narrowRowBottomBoxContentMaker({
                          columns: tableColumns,
                          row,
                          payload: undefined,
                        })}
                      </div>
                    )}
                  </AnimateHeight>
                </div>
              );
            })
          }
        </div>
      </div>

      <div className={style.afterTable}>
        <div className={cla(style.paging)}>
          {/* <div
            className={cla(style.pre, canPreviousPage ? style.canPre : style.cannotPre)}
            onClick={() => previousPage()}
          >
            <ArrowRightSvg />
          </div> */}

          {/* <div className={style.numbering}>{`Page ${currPage} of ${pageCount}`}</div> */}
          <div className={style.numbering}>
            <Paginate
              itemsCount={rows.length}
              itemsPerPage={eachPageSize}
              changeNumItemsPerPage={(num) => {
                changeEachPageSize(num);
              }}
              fns={{
                goToNext: () => nextPage(),
                goToPre: () => previousPage(),
                goToPage: (n: number) => gotoPage(n),
              }}
            />
          </div>

          {/* <div
            className={cla(style.next, canNextPage ? style.canNext : style.cannotNext)}
            onClick={() => nextPage()}
          >
            <ArrowRightSvg />
          </div> */}
        </div>
      </div>
    </div>
  );
};
