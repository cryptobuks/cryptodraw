chrome.runtime.sendMessage({method: "getKey"}, function(response) {
    console.log("pls", response);
   document.getElementById("test").innerHtml = response;
});

