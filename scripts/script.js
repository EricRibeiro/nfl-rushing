import {
  createTableHeader,
  createTableRows,
  createTable,
  addHeaderClickListener
} from './table.js'

import {
  sortByKey,
  searchByKeyword
} from './utils.js'

import {
  addSearchClickListener,
  addInputKeypressListener
} from './search.js'

import {
  addExportClickListener
} from './export.js'

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

  const searchParams = {
    sortBy: urlSearchParams.get("sortBy"),
    currOrder: urlSearchParams.get("order"),
    nextOrder: urlSearchParams.get("order") === "desc" ? "asc" : "desc",
    search: urlSearchParams.get("search")
  }

  // since the page refreshes after every search and sort (a la 2000s web)
  // we have to populate the input again
  document.querySelector("input").value = searchParams.search;

  const shouldSort = (searchParams) => searchParams.sortBy && searchParams.currOrder;
  const shouldSearch = (searchParams) => searchParams.search;

  const sortPlayers = shouldSort(searchParams) 
    ? sortByKey(players, searchParams.currOrder, searchParams.sortBy) 
    : players;

  const filteredPlayers = shouldSearch(searchParams)
    ? searchByKeyword(sortPlayers, searchParams.search, "Player")
    : sortPlayers;

  // search returned results
  if (filteredPlayers.length > 0) {
    const header = createTableHeader(filteredPlayers);
    const rows = createTableRows(filteredPlayers);
    const table = createTable(header, rows)

    document.querySelector("table").innerHTML = table;

  // search returned no results
  } else {
    document.querySelector("table").innerHTML = "No Results ¯\_(ツ)_/¯";
  }

  // adding click event listener on headers to sort table accordingly
  const tblHeaders = document.querySelectorAll("th");
  addHeaderClickListener(tblHeaders, searchParams);

  // adding click event listener on search button
  const button = document.querySelector("button#search");
  addSearchClickListener(button, searchParams);

  // adding keypress event listener on input
  const input = document.querySelector("input");
  addInputKeypressListener(input, searchParams);

  // adding click event listener on search button
  const exportBtn = document.querySelector("button#export");
  addExportClickListener(exportBtn, filteredPlayers);
})()

