export function normalizeNumber(number) {
  const isString = num => (typeof num === 'string' || num instanceof String)
  if (!isString(number)) return number;

  const numWithoutSpecialChars = number.replace(/[^\d\.\-]/g, "");
  return parseFloat(numWithoutSpecialChars);
}

export function sortByKey(arr, order, key) {
  const isNumber = (char) => !isNaN(normalizeNumber(char));

  if (order === "desc")
    return arr.sort((a, b) => {
      if (isNumber(a[key]) && isNumber(a[key])) return normalizeNumber(b[key]) - normalizeNumber(a[key]);
      else return sortAlphabetically(b[key].toLowerCase(), a[key].toLowerCase());
    });

  else if (order === "asc")
    return arr.sort((a, b) => {
      if (isNumber(a[key]) && isNumber(a[key])) return normalizeNumber(a[key]) - normalizeNumber(b[key]);
      else return sortAlphabetically(a[key].toLowerCase(), b[key].toLowerCase());
    });

  else throw Error("Invalid order.");
}

function sortAlphabetically(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}