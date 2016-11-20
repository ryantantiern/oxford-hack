/*
JS Script that saves the files
*/
$(document).ready(function(){
  Sub_getChromeStorage();
});

// Save Button: Saves into an array & into Google's Account Memory
$('#btn-save').click(function(){
  var str_badword = $('#badword').val(),
      str_goodword = $('#goodword').val();

  if ((str_badword.length != 0) && (str_goodword.length != 0)){
    Sub_appendToList(str_badword,str_goodword);
    Sub_setChromeStorage(str_badword,str_goodword);
  }
});

$('#btn-reset').click(function() {
  chrome.storage.sync.clear( function () {
    console.log('Clear all keys');
    $("li").remove();
  });
});

$('#btn-del').click(function () {
  var key = $('#deleteWord').val();
  deleteValue(key);
});

function Sub_initList (data) {
  for (badword in data) {
    Sub_appendToList(badword, data[badword]);
  }
} 

// Appends a new word onto the output list.
function Sub_appendToList (badword, goodword) {
  $('#ul-output').append('<li id="' + badword + '">' + badword + ' : ' + goodword + '</li>');
}

// Saves and updates memory using chrome.storage API
function Sub_setChromeStorage (badword, goodword) {
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

// try to get data, then print list
function Sub_getChromeStorage() {
  chrome.storage.sync.get("data", function(items) {
    try {
      Sub_initList(items.data);
    }
    catch (e) {
      console.log(e);
    }
  });
}


// delete a value 
function deleteValue (key) 
{
  // take in key
  // remove value from memory and UI list
    chrome.storage.sync.get("data", function(items) {
      if (chrome.runtime.error) {
        return null;
      }
      var temp_storage = items.data;
      delete temp_storage[key];
      $('#' + key).remove();
      chrome.storage.sync.set({"data": temp_storage}, function(){
        console.log("Saving as: " + temp_storage);
        if (chrome.runtime.error) {
          console.log("Runtime error.")
        }
      });
    });
  
/*  chrome.storage.sync.remove(target, function () {
    try {
      console.log("remove succesful");
      $('#' + key).remove();
    } catch (err) {
      console.log(err);
    }
  });*/


}
