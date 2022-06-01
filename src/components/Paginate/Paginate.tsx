import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
// import ReactDOM from "react-dom";
// import ReactDOM from 'react-dom';
import ReactPaginate from "react-paginate";
import { cla } from "src/App";
import style from "./Paginate.module.scss";

import { ReactComponent as RightSvg } from "src/styling-constants/svg-items/arrow-right-3.svg";
import { SweetDrop } from "../SweetDrop/SweetDrop";
import { IDropItem } from "src/app/interfaces";

// const hhh = ReactDOM;

// console.log(items);

// function Items({ currentItems }: { currentItems: number[] }) {
//   return (
//     <div className="items">
//     {currentItems && currentItems.map((item, i) => (
//       <div key={i}>
//         <h3>Item #{item}</h3>
//       </div>
//     ))}
//       </div>
//   );
// }

export const Paginate: React.FC<{
  className?: string;
  itemsPerPage: number;
  changeNumItemsPerPage: (num: number) => any;
  itemsCount: number;
  fns: { goToNext: () => any; goToPre: () => any; goToPage: (n: number) => any };
}> = ({ className, itemsPerPage, changeNumItemsPerPage, fns, itemsCount }) => {
  const { t } = useTranslation();
  const items = useMemo(() => {
    return Array(itemsCount)
      .fill(0)
      .map((x, i) => i);
  }, [itemsCount]);

  // We start with an empty list of items.
  // const [currentItems, setCurrentItems] = useState<null | number[]>(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const endItem = useMemo(() => {
    return Math.min(itemOffset + itemsPerPage, itemsCount);
  }, [itemOffset, itemsCount, itemsPerPage]);

  useEffect(() => {
    // Fetch items from another resources.

    // const endOffset = endItem;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [endItem, itemOffset, items.length, itemsCount, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick: (selectedItem: { selected: number }) => void = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
    fns.goToPage(event.selected);
    // fns.goToNext();
  };

  // console.log("pageCount", pageCount);

  const numPerPageOptions = useMemo<IDropItem[]>(() => {
    const list: IDropItem[] = [];

    for (let i = 5; i <= 20; i += 5) {
      list.push({ id: String(i), content: i });
    }

    return list;
  }, []);

  return (
    <div className={cla(style.ground, className)}>
      {/* <Items currentItems={currentItems || []} /> */}

      <div className={style.toSetNumRowsPerPage}>
        <span>View</span>
        <SweetDrop
          name={"Num of rows per page"}
          optionsArr={numPerPageOptions}
          currInd={numPerPageOptions.findIndex((x) => x.content === itemsPerPage)}
          tryToSetNewVal={(index) => {
            const newNum = numPerPageOptions[index].content as number;
            changeNumItemsPerPage(newNum);
          }}
          currentAsTitle={true}
          classForHead={style.headOfNumDrop}
        />
        <span>per page</span>
      </div>

      <div className={style.pagingData}>
        <ReactPaginate
          nextLabel={<RightSvg />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel={<RightSvg />}
          pageClassName={style.pageItem}
          pageLinkClassName={style.pageLink}
          previousClassName={cla(style.pageItem, style.pre)}
          previousLinkClassName={cla(style.pageLink, style.pre, {
            [style.isAble]: itemOffset !== 0,
          })}
          nextClassName={cla(style.pageItem, style.next)}
          nextLinkClassName={cla(style.pageLink, style.next, {
            [style.isAble]: endItem !== itemsCount,
          })}
          breakLabel="..."
          breakClassName={style.pageItem}
          breakLinkClassName={style.pageLink}
          containerClassName={style.pagination}
          activeClassName={style.active}
          renderOnZeroPageCount={undefined}
        />

        <div className={style.pagingInfo}>
          <span>{t("results")}:</span>{" "}
          {itemsCount > 0 ? (
            <span>{`${itemOffset + 1}-${endItem} of ${itemsCount}`}</span>
          ) : (
            <span>{"0"}</span>
          )}
        </div>
      </div>
    </div>
  );
};
