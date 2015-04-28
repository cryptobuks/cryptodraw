//===================================================================

// testing img tags from dom to display buttons later
console.log("DOMContentLoaded");
var imgs = document.images;
for (var i = 0; i < imgs.length; i++) {
  console.log("image url", imgs[i].src);
  console.log("width", imgs[i].width);
  console.log("height", imgs[i].height);
  var btn = document.createElement("button");
  btn.appendChild(document.createTextNode("Report image"));
  btn.onclick = function() {
        alert("blabla"); //add call to check image against database
  };
  imgs[i].parentNode.insertBefore(btn,imgs[i].nextSibling)
}



//$("body").append('Test');