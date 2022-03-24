import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import cs_auth from './dictionary/cs/auth.json';
import cs_common from './dictionary/cs/common.json';
import cs_form from './dictionary/cs/form.json';

const resources = {
    cs: {
        auth: cs_auth,
        common: cs_common,
        form: cs_form,
    },
    en: {
        auth: cs_auth,
        common: cs_common,
        form: cs_form,
    }
};

i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "cs",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;