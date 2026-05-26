import { ui } from './ui';

export function useTranslations() {
  return function t(key: keyof typeof ui) {
    return ui[key];
  };
}
