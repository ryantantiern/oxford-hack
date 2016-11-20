/*
JS Script that saves the files
*/
$(document).ready(function(){
  Sub_getChromeStorage();
});

//Save Button: Saves into an array & into Google's Account Memory
$('#btn-save').click(function(){
  var str_badword = $('#badword').val(),
      str_goodword = $('#goodword').val();

  if ((str_badword.length != 0) && (str_goodword.length != 0)){
    Sub_appendToList(str_badword + " : " + str_goodword);
    Sub_setChromeStorage(str_badword,str_goodword);
  }
});

function Sub_initList(data) {
  for (badword in data) {
    var str = badword + " : " + data[badword];
    Sub_appendToList(str);
  }
};

//Appends a new word onto the output list.
function Sub_appendToList(word) {
  $('#ul-output').append('<li>' + word + '</li>');
}

//Saves and updates memory using chrome.storage API
function Sub_setChromeStorage(badword,goodword) {
	chrome.storage.sync.get("data", function(items) {
    if (chrome.runtime.error) {
      return null;
    }

    var temp_storage = items.data;
    if (!items.data) {
      var temp_storage = {};
    }

    temp_storage[badword] = goodword;
		chrome.storage.sync.set({"data": temp_storage}, function(){
			console.log("Saving as: " + temp_storage);
			if (chrome.runtime.error) {
				console.log("Runtime error.")
			}
	  });
  });
}

function Sub_getChromeStorage() {
	chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
        Sub_initList(items.data);
    }
  });
}
