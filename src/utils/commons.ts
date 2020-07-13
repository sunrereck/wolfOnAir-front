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