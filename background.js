// sign into google account?
chrome.identity.getAuthToken({
    interactive: true
}, function(token) {
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }
    var x = new XMLHttpRequest();
    x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
    x.onload = function() {
        alert(x.response);
    };
    x.send();
});

//===================================================================
// TODO: add authentication methods for higher trust

// chrome.identity.launchWebAuthFlow(
//   {'url': 'https://www.deviantart.com/oauth2/authorize?response_type=code&client_id=2816&redirect_uri=kfnegodndppiokfedppfmimnafkohaah.chromiumapp.org/deviantart&response_type=token&scope=basic', 'interactive': true},
//   function(redirect_url) { /* Extract token from redirect_url */ });

//===================================================================

// testing img tags from dom to display buttons later
document.addEventListener('DOMContentLoaded', function () {
  var imgs = document.images;
  for (var i = 0; i < imgs.length; i++) {
    console.log("image url", imgs[i].src);
  }
});

//===================================================================
// context menues for uploading

function getClickHandler() {
  return function(info, tab) {

    // The srcUrl property is only available for image elements.
    var url = 'upload.html#' + info.srcUrl;

    // Create a new window to the info page.
    chrome.windows.create({ url: url, width: 200, height: 200 });
  };
};

chrome.contextMenus.create({
  "title" : "Claim this image",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick" : getClickHandler()
});

//===================================================================
// generate fresh pgp keypair at first install (user authentication)

function getRandomToken() {
    // source: http://stackoverflow.com/questions/23822170/getting-unique-clientid-from-chrome-extension
    // E.g. 8 * 32 = 256 bits token
    //
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");

        userid = getRandomToken();

        var password = prompt("Please enter a passphrase for encrypting your data", "");
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid, password);
        });

        function useToken(userid, password) {
            var openpgp = window.openpgp;

            var options = {
                numBits: 2048,
                userId: userid,
                passphrase: password
            };

            openpgp.generateKeyPair(options).then(function(keypair) {
                // success
                var privkey = keypair.privateKeyArmored;
                var pubkey = keypair.publicKeyArmored;
            }).catch(function(error) {
                console.log("key generation failed")
            });
        }
    }
});