let ele = document.getElementById("form");
let icon = document.getElementById("search-icon");

// DOM Elements
let searchBar = document.getElementById("search-bar");
let searchListDOM = document.getElementById("search-list");

// google custom search keys
let API_KEY = "AIzaSyAF6PrEEbmZOb1lJqVWwiAQpg3ysI0N608";
let SearchEngineID = "005261878360177818850:u0b8m6c4ejo";

if (ele.addEventListener) {
  ele.addEventListener("submit", callback, false); //Modern browsers
  icon.addEventListener("click", callback);
} else if (ele.attachEvent) {
  ele.attachEvent("onsubmit", callback); //Old Internet Explorer
  icon.addEventListener("click", callback);
}

function callback(e) {
  let arrayInput = document.getElementsByTagName("input")[0].value.split(" ");

  if (arrayInput[0] === undefined) {
    alert("Bad input. Try again");
    e.preventDefault();
  }

  if (arrayInput[1] === undefined) {
    let website = `https://developer.mozilla.org/en-US/search?q=${
      arrayInput[0]
    }`;
    window.open(website, "_blank");
  } else {
    let website = "https://developer.mozilla.org/en-US/search?q=";
    let suffix = arrayInput.join("+");

    window.open(website + suffix, "_blank");
  }
}

window.onload = function() {
  searchBar.focus();
};

// events occurs when searchbar element gets user input
searchBar.addEventListener("input", () => {
  customSerach();
});

/**
 * Google Custom Search |
 * Resource https://developers.google.com/custom-search/v1/using_rest
 */
async function customSerach() {
  let q = searchBar.value;
  let alt = "json";
  let numOfQuery = 5;
  let lang = "lang_en";
  let url =
    "https://www.googleapis.com/customsearch/v1?key=" +
    API_KEY +
    "&cx=" +
    SearchEngineID +
    "&alt=" +
    alt +
    "&num=" +
    numOfQuery +
    "&q=" +
    q +
    "&lr=" +
    lang;

  let response = await fetch(url);

  if (response.ok) {
    let data = await response.json();
    searchListDOM.innerHTML = "";
    if (data.items && data.items.length > 0) {
      for (let index = 0; index < data.items.length; index++) {
        if (data.items[index].link.includes("en-US")) {
          let title = data.items[index].title
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .split("|")[0];
          searchListDOM.innerHTML += `<li><a href="${
            data.items[index].link
          }" target="_blank">${title}</a></li>`;
        }
      }
    }
  } else {
    searchListDOM.innerHTML = "";
  }
}
