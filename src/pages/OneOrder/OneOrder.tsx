import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { cla } from "src/App";
// import { AuthFlowEnum, BasicStatusOfUserT, UserRoleEnum } from "src/app/redux-slices/sweetSlice";
// import { useAuthCheck } from "src/app/routing/ProtectedRoutes";

// import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import { AuthFlowEnum } from "src/app/redux-slices/sweetSlice";
// import { useAuthCheck } from "src/app/routing/ProtectedRoutes";
// import { WideButton } from "src/components/buttons/WideButton";

// import { ReactComponent as MailSvg } from "src/styling-constants/svg-items/mail.svg";
// import { ReactComponent as UnlockSvg } from "src/styling-constants/svg-items/unlock-1.svg";

import { ReactComponent as ArrowRightSvg } from "src/styling-constants/svg-items/arrow-right-2.svg";

import style from "./OneOrder.module.scss";
// import { CloseButton } from "src/components/CloseButton/CloseButton";


import { SweetIconBox } from "src/components/SweetIconBox/SweetIconBox";

const sampleImageSrcOfTiles = `https://i0.wp.com/www.qflooring.com/wp-content/uploads/2021/06/montauk-black-ashler-pat-3.jpg`;

export const OneOrder: React.FC<{}> = () => {
  const params = useParams();
  const { t } = useTranslation();
  // const basicStatusOfUser = useAuthCheck();

  const navigate = useNavigate();

  // const isFullyLoggedIn = useMemo(() => {
  //   return (
  //     [UserRoleEnum.admin, UserRoleEnum.accounting, UserRoleEnum.sales] as BasicStatusOfUserT[]
  //   ).includes(basicStatusOfUser);
  // }, [basicStatusOfUser]);

  // const { t } = useTranslation();

  const orderId = useMemo(() => {
    return params.id;
  }, [params.id]);

  // console.log("orderId", orderId);

  const [showAddProductBox, setShowAddProductBox] = useState(false);
  const [showAddProductBoxWithArea, setShowAddProductBoxWithArea] = useState(false);

  return (
    <div className={style.ground}>
      <div className={style.center}>
        <div className={style.addProduct}>
          <span className={style.tempSpan} onClick={(e) => setShowAddProductBox(true)}>
            {"Add product (Simple)"}
          </span>
          <span className={style.tempSpan} onClick={(e) => setShowAddProductBoxWithArea(true)}>
            {"Add product (With Area)"}
          </span>
          <div
            className={cla(style.groundOfAddProduct, {
              [style.show]: showAddProductBox || showAddProductBoxWithArea,
            })}
          >
            <div className={style.centerBox}>
              <SweetIconBox
                kind="cross"
                onClick={(e) => {
                  setShowAddProductBox(false);
                  setShowAddProductBoxWithArea(false);
                }}
                className={style.closeB}
              />

            
            </div>
          </div>
        </div>

        <div className={style.mainTop}>
          <div className={style.mainTopPart1}>
            <div onClick={() => navigate("/orders")} className={style.parentPageTitle}>
              {t("order_history")}
            </div>

            <div className={style.rightArrowIconWrap}>
              <ArrowRightSvg className={style.rightArrowIcon} />
            </div>

            <div className={style.orderNumber}>{`Order ${orderId}`}</div>
          </div>

          <div className={style.mainTopPart2}>
            <div className={style.download}>{t("download")}</div>
          </div>
        </div>

        <div className={style.generalBox}>
          <div className={style.details}>
            <div className={style.gBDetailsPart1}>
              <div className={cla(style.infoBox, style.orderDate)}>
                <div className={style.title}>{t("orderDate")}</div>
                <div className={style.value}>{"2020-05-20"}</div>
              </div>

              <div className={cla(style.infoBox, style.paymentDate)}>
                <div className={style.title}>{t("paymentDate")}</div>
                <div className={style.value}>{"2020-05-21"}</div>
              </div>

              <div className={cla(style.infoBox, style.paymentMethod)}>
                <div className={style.title}>{t("paymentMethod")}</div>
                <div className={style.value}>{"VISA"}</div>
              </div>

              <div className={cla(style.infoBox, style.paymentTerm)}>
                <div className={style.title}>{t("paymentTerm")}</div>
                <div className={style.value}>{t("creditCard")}</div>
              </div>

              <div className={cla(style.infoBox, style.shipedVia)}>
                <div className={style.title}>{t("shipedVia")}</div>
                <div className={style.value}>{"W/C"}</div>
              </div>
            </div>
            <div className={style.gBDetailsPart2}>
              {[1, 2].map((x, ind) => {
                return (
                  <div key={x} className={style.orderWrap}>
                    <div className={style.mWrap}>
                      <div className={style.previewBlock}>
                        <img className={style.thumb} alt={"preview"} src={sampleImageSrcOfTiles} />
                      </div>

                      <div className={style.infoBlock}>
                        <div className={style.topB}>
                          <div className={style.title}>{"DECMAKKUB2510M"}</div>
                          <div className={style.price}>{`$${"276.99"}`}</div>
                        </div>
                        <div className={style.bodyB}>
                          <div
                            className={style.subtitle}
                          >{`Purestone 12" x 24" Matte Natural Porcelain Tile in Bianco`}</div>

                          <div className={style.detailedInfo}>
                            <div className={cla(style.item, style.sf)}>
                              <div className={style.name}>{"SF"}:</div>
                              <div className={style.value}>
                                <span className={style.nn}>{"21"}</span>{" "}
                                <span className={style.cc}>{"(4 cartons)"}</span>
                              </div>
                            </div>

                            <div className={cla(style.item)}>
                              <div className={style.name}>{t("itemN")}:</div>
                              <div className={style.value}>{"DECMAKKUB2510M"}</div>
                            </div>

                            <div className={cla(style.item)}>
                              <div className={style.name}>{t("color")}:</div>
                              <div className={style.value}>{"Bianco"}</div>
                            </div>

                            <div className={cla(style.item, style.price)}>
                              <div className={style.name}>{t("price")}:</div>
                              <div className={style.value}>
                                <span className={style.nn}>{`$${"13.19"}`}</span>
                                <span className={style.cc}>{"/Sq.Ft."}</span>
                              </div>
                            </div>

                            <div className={cla(style.item)}>
                              <div className={style.name}>{t("size")}:</div>
                              <div className={style.value}>{`12" x 24"`}</div>
                            </div>

                            <div className={cla(style.item, style.note)}>
                              <div className={style.name}>{t("note")}:</div>
                              <div className={style.value}>{`Price per Carlos`}</div>
                            </div>
                          </div>

                          <div
                            className={style.additionalInfo}
                          >{`*Must be sealed. Uncovered outdoor instalation of stone may modify color and finish.*`}</div>

                          <div className={style.totalPriceWrap}>
                            <span className={style.totalPrice}>{`$${"276.99"}`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={style.additionalButtons}>
                      <span className={style.orderAgainButton}>{t("orderAgain")}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={style.gBDetailsPart3}>
              <div className={style.title}>{t("miscCharges")}</div>
              <div className={style.info}>
                <div className={style.left}>{`Surcharge 6% (Auto)`}</div>
                <div className={style.right}>{`$${"14.33"}`}</div>
              </div>
            </div>
          </div>

          <div className={style.summary}>
            <div className={style.mainBox}>
              <div className={style.summMBPart1}>
                <div className={style.topBox}>
                  <div className={style.title}>{t("summary")}</div>
                </div>

                <div className={style.bodyBox}>
                  <div className={style.item}>
                    <div className={style.name}>{t("subtotal")}</div>
                    <div className={style.value}>{`$${"276.99"}`}</div>
                  </div>

                  <div className={style.item}>
                    <div className={style.name}>{t("shipping")}</div>
                    <div className={style.value}>{`$${"76.99"}`}</div>
                  </div>

                  <div className={style.item}>
                    <div className={style.name}>{t("tax")}</div>
                    <div className={style.value}>{`$${"0.00"}`}</div>
                  </div>

                  <div className={style.item}>
                    <div className={style.name}>{t("miscCharges")}</div>
                    <div className={style.value}>{`$${"14.33"}`}</div>
                  </div>
                </div>
              </div>

              <div className={style.summMBPart2}>
                <div className={style.topBox}>
                  <div className={style.left}>{t("total")}</div>
                  <div className={style.right}>{`$${"19,950.08"}`}</div>
                </div>

                <div className={style.bodyBox}>
                  <div className={style.item}>
                    <div className={style.name}>{t("amountDue")}</div>
                    <div className={style.value}>{`$${"0.00"}`}</div>
                  </div>

                  <div className={cla(style.item, style.savings)}>
                    <div className={style.name}>{t("savings")}</div>
                    <div className={style.value}>{`$${"67.60"}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
