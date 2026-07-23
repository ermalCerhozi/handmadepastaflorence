import type en from './locales/en';

// The English dictionary defines the canonical shape; every other locale must
// satisfy this type, so the compiler flags any missing or misnamed key.
export type Dict = typeof en;
