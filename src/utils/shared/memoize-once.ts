type EqualFunc = (newArgs: any[], lastArgs: any[]) => boolean;

export default function makeMemorize(resultFn: Function, isEqual: EqualFunc = defaultEqual) {
  let lastArgs: any[];
  let lastResult: any;
  let lastContext: any;
  let isCalledOnce: boolean = false;

  return function(this: any, ...args: any[]) {
    if (isCalledOnce && this === lastContext && isEqual(args, lastArgs)) {
      return lastResult;
    }

    lastResult = resultFn.apply(this, args);
    lastArgs = args;
    isCalledOnce = true;
    lastContext = this;

    return lastResult;
  }
}

const defaultEqual = (a: any[], b: any[]) => {
  if (a.length !== b.length) {
    return false;
  }

  let len = a.length;

  while (len--) {
    if (a[len] !== b[len]) {
      return false;
    }
  }

  return true;
};
