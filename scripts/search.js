export function addSearchClickListener(button, searchParams) {
  button.addEventListener("click", (e) => {
    const searchValue = document.querySelector("input").value;
    search(searchValue, searchParams);
  })
}

export function addInputKeypressListener(input, searchParams) {
  input.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
      const searchValue = document.querySelector("input").value;
      search(searchValue, searchParams);
    }
  })
}

function search(searchValue, searchParams) {
  if (!searchParams.sortBy || !searchParams.currOrder) {
    window.location.href = 
    `${window.location.origin}?search=${searchValue}`;

  } else {
     window.location.href = 
    `${window.location.origin}?sortBy=${searchParams.sortBy}&order=${searchParams.currOrder}&search=${searchValue}`;
  }
}