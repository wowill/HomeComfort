import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_US';
import autoLocale from './en/auto.json';

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'en'),
    auto: autoLocale,
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
