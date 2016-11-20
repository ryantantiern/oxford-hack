/*
JS Script that saves the files
*/
var str_words = "";


$(document).ready(function(){
	if (Fn_getChromeStorage()) {
		str_words = Fn_getChromeStorage();
	}
});


//Save Button: Saves into an array & into Google's Account Memory
$('#btn-save').click(function(){
  var str_newWord = $('#txt-input').val();
  if (str_newWord.length != 0) {
    Sub_appendToList(str_newWord);
    console.log(str_newWord);
    Sub_setChromeStorage(str_newWord);
  }
});

//Appends a new word onto the output list.
function Sub_appendToList(word) {
  $('#ul-output').append('<li>' + word + '</li>');
}

//Saves and updates memory using chrome.storage API
function Sub_setChromeStorage(word) {
	chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
			if (items.data) {
				chrome.storage.sync.set({"data":items.data + "," + word}, function(){
					console.log("Saving as: " + items.data + "," + word);
					if (chrome.runtime.error) {
						console.log("Runtime error.")
					}
				});
			}
    }
  });
}

function Fn_getChromeStorage() {
	chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
			console.log("Getting items: " + items.data);
			//console.log(items);
			return items.data;
    //  document.getElementById("data").innerText = items.data;
    }
  });
}
