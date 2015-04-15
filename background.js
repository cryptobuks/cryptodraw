// chrome.identity.getAuthToken({
//     interactive: true
// }, function(token) {
//     if (chrome.runtime.lastError) {
//         alert(chrome.runtime.lastError.message);
//         return;
//     }
//     var x = new XMLHttpRequest();
//     x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
//     x.onload = function() {
//         alert(x.response);
//     };
//     x.send();
// });

chrome.identity.launchWebAuthFlow(
  {'url': 'https://www.deviantart.com/oauth2/authorize?response_type=code&client_id=2816&redirect_uri=kfnegodndppiokfedppfmimnafkohaah.chromiumapp.org/deviantart&response_type=token&scope=basic', 'interactive': true},
  function(redirect_url) { /* Extract token from redirect_url */ });