import en from "@/app/locales/en";
import ja from "@/app/locales/ja";
import { useParams } from "next/navigation";

export const useLocale = () => {
  const { locale } = useParams();
  switch (locale) {
    case "en":
      return { locale, t: en };
    case "ja":
      return { locale, t: ja };
    default:
      return { locale, t: en };
  }
};
