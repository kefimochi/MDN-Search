let ele = document.getElementById("form");
let icon = document.getElementById("search-icon");

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
  document.getElementById("search-bar").focus();
};

window.addEventListener("keydown", () => {
  console.log("hi");
});
