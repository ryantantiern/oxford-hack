// Called when the user clicks on the browser action.
document.onLoad.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: "replacewords.js"
  });
});
