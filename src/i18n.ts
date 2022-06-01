import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

import { trEn } from "src/locales/en/translation";
import { trKa } from "src/locales/ka/translation";
import { trRu } from "src/locales/ru/translation";

// we use this instead of locale files when we want a single HTML file bundle
const resources7 = {
  en: {
    translation: trEn,
  },

  ka: {
    translation: trKa,
  },

  ru: {
    translation: trRu,
  },
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: resources7, // if we don't want json files and we want as js objects
    react: {
      useSuspense: false,
    },
    // check primary langugae here to set initial value
    // change value based on user changing primary langugea settings
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    load: "all",

    // backend: {
    //   loadPath: (par, par2) => {
    //     // check the domain
    //     // const host = window.location.host;
    //     // return ('/static/app' + '/static/app/static/locales/{{lng}}/{{ns}}.json');
    //     // return ('https://api.jsonbin.io/b/628b6613402a5b3802098977');
    //     // console.log(par, par2);

    //     if (par[0] === "en") {
    //       return "https://jsonkeeper.com/b/PYZP";
    //     } else if (par[0] === "ka") {
    //       return "https://jsonkeeper.com/b/D5AC";
    //     }

    //     return "https://jsonkeeper.com/b/PYZP";
    //   },
    // },
  });

interface ILanguageItem {
  id: number;
  code: string;
  localName: string; // "English", "Georgian", "Russian" ...
  countryCode: string; // ISO 3166-1 alpha-2
}

export const languageList: ILanguageItem[] = [
  {
    id: 0,
    code: "en",
    localName: "English",
    countryCode: "gb",
  },
  {
    id: 1,
    code: "ru",
    localName: "Русский",
    countryCode: "ru",
  },
  {
    id: 2,
    code: "ka",
    localName: "ქართული",
    countryCode: "ge",
  },
];

export const changeAppLanguage = (languageCode: string) => {
  const inputLang = languageCode;
  const foundLangObject = languageList.find((x) => x.code === inputLang);
  if (foundLangObject) {
    i18n.changeLanguage(foundLangObject.code);
  } else {
    i18n.changeLanguage("en");
  }
};

export const tryWorkaroundForSliderButtons = () => {
  setTimeout(() => {
    const currLang = i18n.resolvedLanguage;
    changeAppLanguage(currLang); // slider buttons not woking without this workaround, I don't know why
  }, 200);
};

tryWorkaroundForSliderButtons();

export default i18n;
