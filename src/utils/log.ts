export const warn = (...msg: string[]) => {
  console && console.warn(...msg);
};

export const log = (...msg: string[]) => {
  console && console.log(...msg);
};
