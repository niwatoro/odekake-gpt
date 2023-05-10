export const ConvertHankakuToZenkaku = (str: string): string => {
  return str.replace(/　/g, " ").replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
};
