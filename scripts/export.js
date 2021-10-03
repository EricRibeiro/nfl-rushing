import {
  convertToCSV
} from './utils.js'

export function addExportClickListener(button, data) {
  button.addEventListener("click", (e) => {
    exportCsv(data);
  })
}

function exportCsv(data) {
  const csv = convertToCSV(data);
  console.log(data)
  console.log(csv)

  // download portion extracted from here: https://stackoverflow.com/a/24922761
  const filename = "players.csv";
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}