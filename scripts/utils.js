export function normalizeNumber(number) {
  const isString = num => (typeof num === 'string' || num instanceof String)
  if (!isString(number)) return number;

  const numWithoutSpecialChars = number.replace(/[^\d\.\-]/g, "");
  return parseFloat(numWithoutSpecialChars);
}

export function isNumber(val) {
  return !isNaN(normalizeNumber(val));
}

// TODO: break this function, it does way to much stuff
export function sortByKey(arr, order, key) {
  if (order === "desc")
    return arr.sort((a, b) => {
      if (isNumber(a[key]) && isNumber(a[key])) return normalizeNumber(b[key]) - normalizeNumber(a[key]);
      else return sortAlphabetically(b[key], a[key]);
    });

  else if (order === "asc")
    return arr.sort((a, b) => {
      if (isNumber(a[key]) && isNumber(a[key])) return normalizeNumber(a[key]) - normalizeNumber(b[key]);
      else return sortAlphabetically(a[key], b[key]);
    });

  else throw Error("Invalid order.");
}

export function searchByKeyword(arr, keyword, key) {
  return arr.filter(el => el[key].toLowerCase().includes(keyword.toLowerCase()));
}

export function convertToCSV(arr) {
  const header = Object.keys(arr[0]).join(',');

  // some values have comma in them and according to this: https://stackoverflow.com/a/769675
  // the proper way to handle it, is to enclose the value in double quotes
  const quoteValuesWithComma = (value) => {
    if (!value.toString().includes(",")) return value;
    return `"${value}"`;
  } 

  const rows = arr.map(obj => {
    const values = Object.values(obj);
    const quotedValuesWithComma = values.map(quoteValuesWithComma);
    const row = quotedValuesWithComma.join(',')
    return row;
  });

  return `${header}\n${rows.join("\n")}`
}

function sortAlphabetically(a, b) {
  const lowerCaseA = a.toLowerCase();
  const lowerCaseB = b.toLowerCase();

  if (lowerCaseA < lowerCaseB) return -1;
  if (lowerCaseA > lowerCaseB) return 1;
  return 0;
}