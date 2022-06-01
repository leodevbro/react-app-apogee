import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { cla } from "src/App";

import { ReactComponent as LogoutSvg } from "src/styling-constants/svg-items/log-out.svg";
import { ReactComponent as SettingsSvg } from "src/styling-constants/svg-items/settings.svg";
import { ReactComponent as BulbSvg } from "src/styling-constants/svg-items/bulb.svg";
import { ReactComponent as ConvertSvg } from "src/styling-constants/svg-items/convert.svg";
import { ReactComponent as LocSvg } from "src/styling-constants/svg-items/loc3.svg";
import { ReactComponent as ProductsSvg } from "src/styling-constants/svg-items/products.svg";
import { ReactComponent as PaperSvg } from "src/styling-constants/svg-items/paper.svg";
import { ReactComponent as TimeSvg } from "src/styling-constants/svg-items/time.svg";
import { ReactComponent as RightSvg } from "src/styling-constants/svg-items/arrow-right-3.svg";
import { ReactComponent as LeftArrowSvg } from "src/styling-constants/svg-items/arrow-left.svg";

import profilePicExampleJpgPath from "src/styling-constants/raster-items/profile-pic-example.jpg";

// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
import style from "./Sidebar3.module.scss";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  BasicStatusOfUserT,
  changeShowSidebarForMobile,
  UserRoleEnum,
} from "src/app/redux-slices/sweetSlice";
import { useMediaQuery } from "react-responsive";
import { useAuthCheck } from "src/app/routing/ProtectedRoutes";
import { SweetDrop } from "../SweetDrop/SweetDrop";

import noImageSvgPath from "src/styling-constants/svg-items/no-image.svg";
const tile1Src = "https://i.ibb.co/8Yry8cq/2022-04-27-13-59-09.png";
const tile2Src = "https://i.ibb.co/3SzrQvm/2022-04-27-13-58-48.png";
const tile3Src = "https://i.ibb.co/mTrzdz7/2022-04-27-13-58-48-2.png";

enum NavEnum {
  none = "none",
  products = "products",
  order_history = "order_history",
  open_invoices = "open_invoices",
  statements = "statements",
  ideabooks = "ideabooks",
  location = "location",
  settings = "settings",
}

export const Sidebar3: React.FC<{ className?: string }> = ({ className }) => {
  const statusOfUser: BasicStatusOfUserT = useAuthCheck();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const storeOfStates = useAppSelector((store) => store);

  const currShowFullSidebarForDesktop = storeOfStates.sweet.showFullSidebarForDesktop;
  const currShowSidebarForMobile = storeOfStates.sweet.showSidebarForMobile;

  const is1004AndDown = useMediaQuery({ query: "(max-width: 1004px)" });

  const showSb = useMemo(() => {
    return (
      (!is1004AndDown && currShowFullSidebarForDesktop) ||
      (is1004AndDown && currShowSidebarForMobile)
    );
  }, [currShowFullSidebarForDesktop, currShowSidebarForMobile, is1004AndDown]);

  const [currExpander, setCurrExpander] = useState<NavEnum>(NavEnum.none);

  const infosOfItems = useMemo(() => {
    const arr: {
      id: NavEnum;
      link: string;
      ic: any;
      isExpandable: boolean;
      clickFn?: () => any;
    }[] = [
      {
        id: NavEnum.products,
        link: "/products",
        ic: <ProductsSvg />,
        isExpandable: true,
        clickFn: () =>
          setCurrExpander((prev) => (prev === NavEnum.products ? NavEnum.none : NavEnum.products)),
      },
    ];

    if (
      [UserRoleEnum.admin, UserRoleEnum.accounting, UserRoleEnum.sales].includes(
        statusOfUser as UserRoleEnum,
      )
    ) {
      arr.push({
        id: NavEnum.order_history,
        link: "/orders",
        ic: <TimeSvg />,
        isExpandable: false,
        clickFn: () => setCurrExpander((prev) => NavEnum.none),
      });
    }

    if ([UserRoleEnum.admin, UserRoleEnum.accounting].includes(statusOfUser as UserRoleEnum)) {
      arr.push({
        id: NavEnum.statements,
        link: "/statements",
        ic: <PaperSvg />,
        isExpandable: false,
        clickFn: () => setCurrExpander((prev) => NavEnum.none),
      });
    }

    if ([UserRoleEnum.admin, UserRoleEnum.accounting].includes(statusOfUser as UserRoleEnum)) {
      arr.push({
        id: NavEnum.open_invoices,
        link: "/invoices",
        ic: <ConvertSvg />,
        isExpandable: false,
        clickFn: () => setCurrExpander((prev) => NavEnum.none),
      });
    }

    arr.push(
      {
        id: NavEnum.ideabooks,
        link: "/ideabooks",
        ic: <BulbSvg />,
        isExpandable: false,
        clickFn: () => setCurrExpander((prev) => NavEnum.none),
      },
      {
        id: NavEnum.location,
        link: "/location",
        ic: <LocSvg />,
        isExpandable: false,
        clickFn: () => setCurrExpander((prev) => NavEnum.none),
      },
    );

    if (
      [UserRoleEnum.admin, UserRoleEnum.accounting, UserRoleEnum.sales].includes(
        statusOfUser as UserRoleEnum,
      )
    ) {
      arr.push({
        id: NavEnum.settings,
        link: "/settings",
        ic: <SettingsSvg />,
        isExpandable: false,
        clickFn: () => setCurrExpander((prev) => NavEnum.none),
      });
    }

    return arr;
  }, [statusOfUser]);

  const currNav = useMemo(() => {
    const thisLocation = location.pathname;
    const thisTitleId = infosOfItems.find((x) => x.link === thisLocation);
    if (thisTitleId) {
      return thisTitleId.id;
    } else {
      return undefined;
    }
  }, [infosOfItems, location.pathname]);

  // const isLoggedIn = true as any;
  // const location = useLocation();
  // console.log("useLocation():", location);

  // const navigate = useNavigate();
  // const urlParams = useParams();
  // console.log("parr:", urlParams);

  // const [currNav, setCurrNav] = useState<NavT | undefined>(undefined);

  const currClassFn = useCallback(
    (navName: string) => {
      if (navName === currNav) {
        return style.isCurr;
      }

      return style.notCurr;
    },
    [currNav],
  );

  const cl_show = useMemo(() => {
    return showSb ? style.show : style.hide;
  }, [showSb]);

  const cl_showExp = useMemo(() => {
    return currExpander === NavEnum.none ? style.hideExp : style.showExp;
  }, [currExpander]);

  const dddContent1 = (
    <div className={cla(style.theContentMain)}>
      <div className={style.up}>
        {infosOfItems.map((item, ind) => {
          const a = (
            <div key={`${item.id}_ho`} className={style.ho}>
              <span className={style.sp1}></span>
              <span className={style.sp2}></span>
            </div>
          );
          const b = (
            <div
              key={item.id}
              className={cla(style.item, currClassFn(item.id))}
              onClick={() => {
                item.clickFn && item.clickFn();

                if (item.id === NavEnum.products) {
                  return;
                }

                if (is1004AndDown) {
                  dispatch(changeShowSidebarForMobile(false));
                }
                navigate(item.link);
              }}
            >
              <span className={style.icon}>{item.ic}</span>
              <span className={style.theRight}>
                <span className={style.text}>{t(item.id)}</span>
                {item.isExpandable && (
                  <span className={style.rightSvgWrap}>
                    <RightSvg />
                  </span>
                )}
              </span>
            </div>
          );

          if (item.id === NavEnum.settings) {
            return (
              <React.Fragment key={item.id}>
                {a}
                {b}
              </React.Fragment>
            );
          } else {
            return b;
          }
        })}
      </div>

      <div className={style.downWrap}>
        <div className={style.down}>
          <div className={cla(style.profileArea)}>
            <div className={style.profileWrap}>
              <div className={style.profile}>
                <img
                  className={style.profilePic}
                  alt="profile pic"
                  src={profilePicExampleJpgPath}
                />
                <div className={style.profileName}>{"Annabelle Wallis"}</div>
              </div>
            </div>

            <div
              className={style.logout}
              onClick={() => {
                if (is1004AndDown) {
                  dispatch(changeShowSidebarForMobile(false));
                }
              }}
            >
              <LogoutSvg className={style.logoutSvg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const listOfDropsOfProducts = useMemo(() => {
    const arr: {
      name: string;
      options: { id: string; title: string; imgSrc?: string }[];
    }[] = [
      {
        name: "Ceramic & Porcelain",
        options: [
          { id: "tile", title: "Tile", imgSrc: tile1Src },
          { id: "mosaic", title: "Mosaic", imgSrc: tile3Src },
          { id: "trim", title: "Trim", imgSrc: tile1Src },
          { id: "vinyl", title: "Vinyl", imgSrc: tile3Src },
        ],
      },

      {
        name: "Decorative",
        options: [
          { id: "tile", title: "Tile", imgSrc: tile1Src },
          { id: "mosaic", title: "Mosaic", imgSrc: tile3Src },
          { id: "trim", title: "Trim", imgSrc: tile1Src },
        ],
      },

      {
        name: "Stone",
        options: [
          { id: "tile", title: "Tile", imgSrc: tile3Src },
          { id: "mosaic", title: "Mosaic", imgSrc: tile3Src },
          { id: "paver", title: "Paver", imgSrc: tile3Src },
          { id: "ledger", title: "Ledger", imgSrc: tile1Src },
          { id: "trim", title: "Trim", imgSrc: tile1Src },
        ],
      },

      {
        name: "Vinyl",
        options: [
          { id: "tile", title: "Tile", imgSrc: tile2Src },
          { id: "trim", title: "Trim", imgSrc: tile1Src },
        ],
      },

      {
        name: "Slabs",
        options: [
          { id: "dolomite", title: "Dolomite" },
          { id: "granite", title: "Granite" },
          { id: "marble", title: "Marble" },
          { id: "porcelain", title: "Porcelain" },
          { id: "quartz", title: "Quartz" },
          { id: "quartzite", title: "Quartzite" },
          { id: "slate", title: "Slate" },
        ],
      },

      {
        name: "Allied",
        options: [
          { id: "cleaningSealing", title: "Cleaning & Sealing" },
          { id: "installProducts", title: "Install Products" },
          { id: "powerTools", title: "Power Tools" },
          { id: "tools", title: "Tools" },
        ],
      },
    ];

    return arr;
  }, []);

  const dddContent2 = (
    <div className={cla(style.theContentExpProducts)}>
      {listOfDropsOfProducts.map((drop, index) => {
        const theArray = drop.options.map((contentItem) => {
          return {
            id: contentItem.id,
            content: (
              <div key={contentItem.id} className={style.specificProductGategory}>
                <img
                  alt="product view"
                  src={contentItem.imgSrc || noImageSvgPath}
                  className={style.image}
                />
                <div className={style.title}>{contentItem.title}</div>
              </div>
            ),
          };
        });

        return (
          <SweetDrop
            key={drop.name}
            name={drop.name}
            optionsArr={theArray}
            currInd={-1}
            tryToSetNewVal={(index) => {
              // setCurrIndexOfSectionForMobile(index);
              // window.localStorage.setItem(LSEnum.bedro_sectionOfSettings, String(index));
            }}
            className={style.expDrop}
            classForChoiceGround={style.expChoiceGround}
            classForChoice={style.expChoice}
            classForHead={style.expHead}
            classForItem={style.expItem}
            styling={"style4"}
          />
        );
      })}
    </div>
  );

  return (
    <div className={cla(className, style.ground, cl_show, cl_showExp)}>
      <div className={cla(style.ground2, cl_show, cl_showExp)}>
        <div className={cla(style.mainBox, cl_show, cl_showExp)}>{dddContent1}</div>
        <div className={cla(style.expBox, cl_show, cl_showExp)}>
          <div className={style.topNav}>
            <div
              className={style.back}
              onClick={() => {
                setCurrExpander((prev) => NavEnum.none);
              }}
            >
              <span className={style.leftIconWrap}>
                <LeftArrowSvg className={style.leftIcon} />
              </span>
              <span className={style.title}>Back</span>
            </div>
          </div>
          <div className={style.bodyWrap}>{dddContent2}</div>
        </div>
      </div>
    </div>
  );
};
