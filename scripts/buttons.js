//===================================================================

// testing img tags from dom to display buttons later
document.addEventListener('DOMContentLoaded', function () {
  var imgs = document.images;
  for (var i = 0; i < imgs.length; i++) {
    console.log("image url", imgs[i].src);
    console.log("width", imgs[i].width);
    console.log("height", imgs[i].height);
  }
});


$("body").append('Test');