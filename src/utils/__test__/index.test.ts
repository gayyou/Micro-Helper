import {isString, isSymbol} from "@/utils";

test('Test index utils', () => {
  expect(isSymbol(Symbol())).toBeTruthy();

  expect(isString('')).toBeTruthy();
});
