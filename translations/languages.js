import LocalizedStrings from "react-native-localization";
import { createContext } from "react";
import english from './en';
import arabic from './ar';
export const strings = new LocalizedStrings({
    "en": english,
    "ar": arabic
});
export const langcontext = createContext();