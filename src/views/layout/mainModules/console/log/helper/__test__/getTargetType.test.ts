import {getTargetType} from "../../helper/getTargetType";

it('should return type string contains all types', function () {
  let obj = {
    map: new Map(),
    set: new Set(),
    date: new Date(),
    pattern: new RegExp(/\d/),
    math: Math,
    symbol: Symbol(),
    weakMap: new WeakMap(),
    weakSet: new WeakSet(),
    string: 'String',
    number: 1,
    boolean: true,
    Undefined: undefined,
    Null: null,
    array: [],
    object: {}
  };

  let returnString = (getTargetType(obj, 100)).toLowerCase();
  let hasMap = returnString.includes('map');
  let hasSet = returnString.includes('set');
  let hasWeakMap = returnString.includes('weakmap');
  let hasWeakSet = returnString.includes('weakset');
  let hasSymbol = returnString.includes('symbol');
  let hasString = returnString.includes('string');
  let hasNumber = returnString.includes('1');
  let hasTrue = returnString.includes('true');
  let hasNull = returnString.includes('null');
  let hasUndef = returnString.includes('undefined');
  let hasArray = returnString.includes('array(0)');
  let hasObj = returnString.includes('object');
  let hasDate = returnString.includes('date');
  let hasPattern = returnString.includes('regexp');
  let hasMath = returnString.includes('math');

  expect(hasArray).toBeTruthy();

  expect(hasMap).toBeTruthy();

  expect(hasNull).toBeTruthy();

  expect(hasSet).toBeTruthy();

  expect(hasArray).toBeTruthy();

  expect(hasNumber).toBeTruthy();

  expect(hasObj).toBeTruthy();

  expect(hasTrue).toBeTruthy();

  expect(hasUndef).toBeTruthy();

  expect(hasWeakMap).toBeTruthy();

  expect(hasWeakSet).toBeTruthy();

  expect(hasSymbol).toBeTruthy();

  expect(hasString).toBeTruthy();

  expect(hasPattern).toBeTruthy();

  expect(hasDate).toBeTruthy();

  expect(hasMath).toBeTruthy();
});
