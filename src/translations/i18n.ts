import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import cs_auth from './dictionary/cs/auth.json';
import cs_common from './dictionary/cs/common.json';
import cs_form from './dictionary/cs/form.json';
import cs_portal from './dictionary/cs/portal.json';
import cs_project from './dictionary/cs/project.json';
import cs_toast from './dictionary/cs/toast.json';
import cs_settings from './dictionary/cs/settings.json';
import cs_job from './dictionary/cs/job.json';

const resources = {
  cs: {
    auth: cs_auth,
    common: cs_common,
    form: cs_form,
    portal: cs_portal,
    project: cs_project,
    toast: cs_toast,
    settings: cs_settings,
    job: cs_job
  },
  en: {
    auth: cs_auth,
    common: cs_common,
    form: cs_form,
    portal: cs_portal,
    project: cs_project,
    settings: cs_settings,
    job: cs_job
  }
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'cs',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
