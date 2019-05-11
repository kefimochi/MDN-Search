chrome.browserAction.onClicked.addEventListener(buttonClicked);

function buttonClicked(tab) {
  console.log(tab);
}

console.log("HERE");
// It will always be running while your extension is turned on and is useful for listening to different events, such as keyboard presses, or for navigating to different pages.
