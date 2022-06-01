import React from "react";
import { useTranslation } from "react-i18next";
import { cla } from "src/App";


import { changeAppLanguage, languageList } from "src/i18n";

import style from "./LangSelect.module.scss";
// import { useAppSelector } from "src/app/hooks";

export const LangSelect: React.FC<{ className?: string }> = ({ className }) => {
  const { i18n } = useTranslation();

  return (
    <div className={cla(className, style.langSelectBox)}>
      <select
        disabled={false}
        value={i18n.language}
        onChange={(e) => {
          const val = e.target.value;
          changeAppLanguage(val);
        }}
        className={cla(style.langSelect, style.selectCool)}
      >
        {languageList.map((lang, i) => (
          <option key={lang.code} value={lang.code} className={style.optionOfLangSelect}>
            {lang.code}
          </option>
        ))}
      </select>
    </div>
  );
};
