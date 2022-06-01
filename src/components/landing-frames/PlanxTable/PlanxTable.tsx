import React, { useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
// import { useTranslation } from "react-i18next";
import { useDraggable } from "react-use-draggable-scroll";

import { cla } from "src/App";
import style from "./PlanxTable.module.scss";

export const PlanxTable: React.FC<{
  className?: string;
}> = ({ className }) => {
  // const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  const dot1 = (
    <div
      className={style.dot}
      style={{
        backgroundColor: "rgb(54, 54, 54)",
        width: "10px",
        height: "10px",
        borderRadius: "20px",
      }}
    ></div>
  );

  const dot2 = (
    <div
      className={style.dot}
      style={{
        border: "1px solid rgb(54, 54, 54)",
        width: "10px",
        height: "10px",
        borderRadius: "20px",
      }}
    ></div>
  );

  const dot3 = (
    <div
      className={style.dot}
      style={{
        backgroundColor: "rgb(9, 103, 210)",
        width: "10px",
        height: "10px",
        borderRadius: "20px",
      }}
    ></div>
  );

  const [tableIsVis, setTableIsVis] = useState(true);

  return (
    <div className={cla(style.ground, className)}>
      <div className={style.wrapOfTitle}>
        <span className={style.title}>Planx Applications</span>
        <span className={style.accordionButton} onClick={() => setTableIsVis((prev) => !prev)}>
          <div className={style.inner}></div>
          <div className={cla(style.inner2, { [style.hid]: tableIsVis })}></div>
        </span>
      </div>

      <AnimateHeight
        easing={"ease-in-out"}
        duration={400}
        height={tableIsVis ? "auto" : 0}
        // className={}
      >
        <div
          className={cla(
            style.mainBox,
            style.hoSlide,

            "flex max-w-xl space-x-3 overflow-x-scroll scrollbar-hide",
          )}
          {...events}
          ref={ref} // add reference and events to the wrapping div
        >
          <table cellSpacing="0" className={style.myTable}>
            <thead>
              <tr className={style.tr1}>
                <th>
                  <div className={style.dat}></div>
                </th>

                <th colSpan={2}>
                  <div className={style.dat}>Floors</div>
                </th>

                <th colSpan={2}>
                  <div className={style.dat}>Walls</div>
                </th>

                <th colSpan={2}>
                  <div className={style.dat}>Counter Tops</div>
                </th>

                <th colSpan={2}>
                  <div className={style.dat}>Shower Floors</div>
                </th>

                <th colSpan={2}>
                  <div className={style.dat}>Shower Walls</div>
                </th>

                <th colSpan={2}>
                  <div className={style.dat}>Pools / Spas</div>
                </th>
              </tr>

              <tr className={style.tr2}>
                <th>
                  <div className={style.dat}></div>
                </th>

                <th className={style.interior}>
                  <div className={style.dat}>Interior</div>
                </th>

                <th className={style.exterior}>
                  <div className={style.dat}>Exterior</div>
                </th>

                <th className={style.interior}>
                  <div className={style.dat}>Interior</div>
                </th>

                <th className={style.exterior}>
                  <div className={style.dat}>Exterior</div>
                </th>

                <th className={style.interior}>
                  <div className={style.dat}>Interior</div>
                </th>

                <th className={style.exterior}>
                  <div className={style.dat}>Exterior</div>
                </th>

                <th className={style.interior}>
                  <div className={style.dat}>Interior</div>
                </th>

                <th className={style.exterior}>
                  <div className={style.dat}>Exterior</div>
                </th>

                <th className={style.interior}>
                  <div className={style.dat}>Interior</div>
                </th>

                <th className={style.exterior}>
                  <div className={style.dat}>Exterior</div>
                </th>

                <th className={style.interior}>
                  <div className={style.dat}>Interior</div>
                </th>

                <th className={style.exterior}>
                  <div className={style.dat}>Exterior</div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div className={style.dat}>Residential</div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}>{dot2}</div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat} style={{ display: "flex" }}>
                    {dot1}
                    {dot3}
                  </div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat} style={{ display: "flex" }}>
                    {dot1}
                    {dot3}
                  </div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}></div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}>{dot1}</div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className={style.dat}>Commercial</div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}></div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}></div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.interior}>
                  <div className={style.dat}>{dot1}</div>
                </td>

                <td className={style.exterior}>
                  <div className={style.dat}>{dot1}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={style.foot}>
          <div className={style.left}>
            <div className={style.inf}>
              <span>{dot2}</span>
              <span>May be suitable for Exterior Floors</span>
            </div>
            <div className={style.inf}>
              <span>{dot3}</span>
              <span>Special Order</span>
            </div>
          </div>

          <div className={style.right}>
            <span className={style.span}>Download Tearsheet</span>
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};
