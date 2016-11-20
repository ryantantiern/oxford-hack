chrome.storage.sync.get("data", function(items) {
  if (chrome.runtime.error) {
    return null;
  }

  var words = items.data
  for (var badwords in words) {
    var regEx = new RegExp("(" + badwords + ")(?!([^<]+)?>)", "gi");
    document.documentElement.innerHTML = document.documentElement.innerHTML.replace(regEx, words[badwords]);
  }
});
