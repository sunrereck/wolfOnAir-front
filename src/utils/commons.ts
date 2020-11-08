
type ObjectType = Record<string, unknown>

/**
 * parameter로 받은 객체가 빈값인지 아닌지 확인한다.
 * @param object 빈값인지 아닌지 확인할 객체
 * @returns 객체가 빈값인지 아닌지 확인한 bool 결과
 */
export function checkEmptyObject(object: ObjectType): boolean {
  return Object.keys(object).length === 0;
}

/**
 * parameter로 받은 값이 객체인지 아닌지 확인한다.
 * @param object 객체인지 아닌지 확인할 값.
 * @returns 객체인지 아닌지 확인한 bool 결과
 */
export function checkObject(object: unknown): boolean {
  return !!object && typeof object === 'object';
}

/**
 * 객체 두개가 같은 값을 가진 객체인지 아닌지 확인한다.
 * @param {object} object1 비교할 객체 1
 * @param {object} object2 비교할 객체 2
 * @returns 객체가 같은지 아닌지 비교한 bool 결과
 */
export function checkDeepEqualObject(
  object1: ObjectType,
  object2: ObjectType
): boolean {
  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);

  if (object1Keys.length !== object2Keys.length) {
    return false;
  }

  for (const key of object1Keys) {
    const value1 = object1[key];
    const value2 = object2[key];
    const areObjects = checkObject(value1 as ObjectType)
      && checkObject(value2 as ObjectType);

    if (
      (areObjects
        && !checkDeepEqualObject(
          value1 as ObjectType,
          value2 as ObjectType
        ))
      || (!areObjects && value1 !== value2)
    ) {

      console.log(123);
      return false;
    }
  }

  return true;
}

export function getUrlQuery(search: string) {
  const querys = search.trim().replace(/^[?#&]/, '');
  const queryObj: {
    [key: string]: string | number;
  } = {};

  if (!querys) {
    return null;
  }

  for (const param of querys.split('&')) {
    const text = param.split('=');
    const key = text.length > 0 ? text[0] : '';
    let value: string | number = text.length > 1 ? text[1] : '';

    if (!isNaN(Number(value))) {
      value = Number(value);
    }

    if (!!key && !!value) {
      queryObj[key] = value;
    }
  }

  return queryObj;
}