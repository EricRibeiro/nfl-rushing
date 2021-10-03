import { 
  createTableHeader, 
  createTableRows, 
  createTable,
  addHeaderClickListener
} from './table.js'

import {
  sortByKey
} from './utils.js'

async function fetchPlayers() {
  try {
    return await fetch("https://raw.githubusercontent.com/EricRibeiro/nfl-rushing/master/rushing.json");

  } catch (e) {
    console.log(`Something went wrong while fetching the players.`);
    throw e;
  }
}

(async () => {
  const response = await fetchPlayers();
  const players = await response.json();

  const rawUrlSearchParams = window.location.search 
  const urlSearchParams = new URLSearchParams(rawUrlSearchParams);

  const sortBy = urlSearchParams.get("sortBy");
  const order = urlSearchParams.get("order");
  const search = urlSearchParams.get("search");

  const searchParams = {
    sortBy,
    currOrder: order,
    nextOrder: order === "desc" ? "asc" : "desc",
    search
  }

  const shouldSort = (searchParams) => searchParams.sortBy && searchParams.currOrder

  const sortPlayers = shouldSort(searchParams) ? sortByKey(players, order, sortBy) : players;
  const header = createTableHeader(sortPlayers);
  const rows = createTableRows(sortPlayers);
  const table = createTable(header, rows)

  document.querySelector("body").innerHTML = table;

  // adding click event listener on headers to sort table accordingly
  const tblHeaders = document.querySelectorAll("th");
  addHeaderClickListener(tblHeaders, searchParams);


  // Total Rushing Yards Sorting Desc
  // some players have their total yards as string
  // we need to normalize it before sorting 
  // console.log(players.sort((a, b) => normalizeNumber(b.Yds) - normalizeNumber(a.Yds)));

  // Longest Rush Desc
  // console.log(players.sort((a, b) => normalizeNumber(b.Lng) - normalizeNumber(a.Lng)));

  // Total Rushing Touchdowns Asc
  // console.log(players.sort((a, b) => normalizeNumber(b.TD) - normalizeNumber(a.TD)));
})()

