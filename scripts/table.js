export function createTableRows(players) {
  const tableRows = players.reduce((acc, curr) => {
    const toCell = (cells, cellValue) => cells + `<td>${cellValue}</td>`;
    const cells = Object.values(curr).reduce(toCell, "");
    const row = `
      <tr>
        ${cells}
      </tr>`

    return acc + row;
  }, "");

  return tableRows;
}

export function createTableHeader(players) {
  const toHeader = (headers, headerValue) => headers + `<th>${headerValue}</th>`
  const header = Object.keys(players[0]).reduce(toHeader, "");
  return header;
}

export function createTable(header, rows) {
  return `
    <table>
      <thead>
        <tr>
          ${header}
        <tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `
}

export function addHeaderClickListener(headers, searchParams) {
  headers.forEach(header => {
    header.addEventListener("click", (e) => sortTable(e.target.innerHTML, searchParams))
  });
}

function sortTable(key, searchParams) {
  // if the user is clicking in the same header
  // just change from desc to asc or vice-versa
  const sortUrl = (searchParams.sortBy !== key)
    ? `${window.location.origin}?sortBy=${encodeURIComponent(key)}&order=desc`
    : `${window.location.origin}?sortBy=${encodeURIComponent(key)}&order=${searchParams.nextOrder}`

  if (searchParams.search)
    window.location.href = `${sortUrl}&search=${searchParams.search}`;
  else
    window.location.href = sortUrl;
}